const { mountRoutes } = require('remix-mount-routes');

const basePath = process.env.REMIX_BASEPATH ?? '';

module.exports = {
  ignoredRouteFiles: ['.*'],
  publicPath: `${basePath}/build/`,
  assetsBuildDirectory: `public${basePath}/build`,
  routes: defineRoutes => {
    const baseRoutes = mountRoutes(basePath, 'routes');
    const indexRoutes = defineRoutes(route => {
      route('/', 'routes/home/_index.tsx')
      route('/api/events', 'routes/api/events/_index.ts')
      route('/dashboard', 'routes/dashboard/_index.tsx')
      route('api/network', 'routes/api/network/_index.ts')
      route('api/about', 'routes/api/about/_index.ts')
      route('/events', 'routes/home/events.tsx')
      route('/about', 'routes/home/about.tsx')
    })
    const routes = {
      ...baseRoutes,
      ...indexRoutes,
    }
    return routes
  },
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  postcss: true,
  serverModuleFormat: "cjs",
  tailwind: true,
};
