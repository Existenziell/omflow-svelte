import { wrap } from 'svelte-spa-router/wrap'
import NotFound from '~/routes/NotFound'

// https://github.com/ItalyPaleAle/svelte-spa-router
export default {

  '/': wrap({
    asyncComponent: () => import('~/routes/Home.svelte')
  }),

  '/about': wrap({
    asyncComponent: () => import('~/routes/About.svelte')
  }),

  '/teachers/': wrap({
    asyncComponent: () => import('~/routes/Teachers.svelte')
  }),
  '/teacher/:id/': wrap({
    asyncComponent: () => import('~/routes/Teacher.svelte')
  }),
  '/teacher-create/': wrap({
    asyncComponent: () => import('~/routes/TeacherCreate.svelte')
  }),

  '/classes/': wrap({
    asyncComponent: () => import('~/routes/Classes.svelte')
  }),
  '/class/:id/': wrap({
    asyncComponent: () => import('~/routes/Class.svelte')
  }),

  '/schedule/': wrap({
    asyncComponent: () => import('~/routes/Schedule.svelte')
  }),

  '/matchme/': wrap({
    asyncComponent: () => import('~/routes/Matchme.svelte')
  }),

  '/map/': wrap({
    asyncComponent: () => import('~/routes/Map.svelte')
  }),

  '/dashboard/': wrap({
    asyncComponent: () => import('~/routes/Dashboard.svelte')
  }),

  // Catch-all - this is optional, but if present it must be the last
  '*': NotFound,
}
