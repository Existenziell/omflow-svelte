<script>
  import { onMount } from "svelte";
  import { mapbox } from "../mapbox.js";

  export let lat;
  export let lon;
  export let zoom;
  export let mapdata;

  let container;
  let map;
  let API_URL = process.env.API_URL;
  let geocoder;

  const addLayers = async () => {
    map.on("load", () => {
      map.addSource("places", {
        type: "geojson",
        data: mapdata, // Point to GeoJSON data.
        cluster: true, // set the 'cluster' option to true. GL-JS will add the point_count property to your source data.
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "places",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#FFFFFF",
          "circle-radius": 20,
          "circle-opacity": 0.8,
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "places",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-size": 14,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "places",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#FFFFFF",
          "circle-radius": 10,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ddd",
          "circle-opacity": 0.8,
        },
      });
    });
    initListeners();
  };

  const initListeners = () => {
    map.on("click", "clusters", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties.cluster_id;
      map
        .getSource("places")
        .getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
            essential: true,
          });
        });
    });

    map.on("click", "unclustered-point", (e) => {
      let coordinates = e.features[0].geometry.coordinates.slice();
      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      let html = createMarkerHtml(e.features[0]);
      new mapbox.Popup().setLngLat(coordinates).setHTML(html).addTo(map);

      map.flyTo({
        // These options control the ending camera position: centered at the target
        center: e.features[0].geometry.coordinates,
        // zoom: 9,
        bearing: 0, // north up
        speed: 0.2, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: (t) => {
          return t;
        },
        // this animation is considered essential with respect to prefers-reduced-motion
        essential: true,
      });
    });

    map.on("mouseenter", "clusters", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseenter", "unclustered-point", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "clusters", () => {
      map.getCanvas().style.cursor = "";
    });
    map.on("mouseleave", "unclustered-point", () => {
      map.getCanvas().style.cursor = "";
    });
  };

  const createMarkerHtml = (data) => {
    const {
      id,
      name,
      image,
      video,
      description,
      classes,
      tag,
    } = data.properties;
    return `
  <div class="popup">
    <section class="popup-left">
      <img src="${process.env.API_URL}/${image}" alt="${tag}" />
    </section>
    <section class="popup-right">
      <h1>${name}</h1>
      <p>${description}</p>
      <a href="/teachers/${id}" data-link>More about ${name}</a>
      <h2>${name} is offering the following classes:</h2>
      <span>${classes}</span>
      </section>
  </div>
`;
  };

  // Use custom Geocoder to include the features in map.json
  const forwardGeocoder = (query) => {
    let matchingFeatures = [];
    for (let i = 0; i < mapdata.features.length; i++) {
      let feature = mapdata.features[i];
      if (feature.id.toLowerCase().search(query.toLowerCase()) !== -1) {
        feature["center"] = feature.geometry.coordinates;
        feature["place_name"] = "🙏 " + feature.id;
        matchingFeatures.push(feature);
      }
    }
    return matchingFeatures;
  };

  const createGeo = () => {
    geocoder = new MapboxGeocoder({
      accessToken: mapbox.accessToken,
      localGeocoder: forwardGeocoder,
      marker: false,
      zoom: 5,
      placeholder: "Search event / location",
      mapbox: mapbox,
      limit: 20,
    });

    // Add geolocate control to the map.
    const geolocate = new mapbox.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    // Add search bar and geolocate button
    map.addControl(geocoder);
    map.addControl(geolocate);

    // Open corresponding popup if result is clicked
    geocoder.on("result", (e) => {
      // Close all open popups
      const popup = document.querySelector(".mapbox-popup");
      if (popup) popup.parentNode.removeChild(popup);
      // Create new poppup only if own result
      if (e.result.properties.name) {
        let html = createMarkerHtml(e.result);
        let coords = e.result.geometry.coordinates;
        let popup = new mapbox.Popup({ offset: 15 })
          .setLngLat(coords)
          .setHTML(html)
          .addTo(map);
      }
    });
  };

  onMount(() => {
    // Inject Mapbox CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: "mapbox://styles/mapbox/satellite-v9",
        center: [lon, lat],
        zoom,
      });

      // After Map is created, add Layers/Listeners and Geocoder/Geolocate
      addLayers();
      createGeo();
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });
</script>

<style>
  div {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>
