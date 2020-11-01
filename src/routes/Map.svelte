<script>
  import MapCanvas from "../components/MapCanvas.svelte";
  import { onMount } from "svelte";

  let mapdata;
  let teachers;
  let loading = true;

  onMount(async () => {
    let res = await fetch(`${process.env.API_URL}/teachers/`);
    teachers = await res.json();
    mapdata = await createMapData(teachers);
    loading = false;
  });

  const createMapData = (teachers) => {
    let template = `{
      "type":"FeatureCollection",
      "features": [`;
    for (let teacher of teachers) {
      const teacherClasses = teacher.practices.map((c) => {
        return `${c.level.identifier} ${c.style.identifier}`;
      });
      template += `
      {
        "type": "Feature",
        "id": "${teacher.name}, Omflow teacher",
        "properties": {
          "id": "${teacher._id}",
          "name": "${teacher.name}",
          "tag": "${teacher.tag}",
          "image": "${teacher.image}",
          "video": "${teacher.video}",
          "description": "${teacher.description}",
          "classes": "${teacherClasses.join(" ")}"
        },
        "geometry": {
           "type":"Point",
           "coordinates": ["${teacher.coordinates[0]}", "${
        teacher.coordinates[1]
      }"]
        }
      },
     `;
    }
    template += `
      ]
    }`;

    let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
    let correct = template.replace(regex, ""); // remove all trailing commas
    let result = JSON.parse(correct);
    return result;
  };
</script>

{#if !loading}
  <MapCanvas lat={15} lon={20} zoom={1.9} {mapdata} />
{/if}
