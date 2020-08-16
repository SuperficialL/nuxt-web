module.exports = {
  apps: [
    {
      name: 'nuxt-web',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      autorestart: true,
      watch: false,
      exec_mode: 'cluster',
      ignore_watch: ['node_modules'],
      env: {
        COMMON_ENV_VAR: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['49.233.165.116'],
      port: '22',
      repo: 'git@github.com:SuperficialL/nuxt-web.git',
      ref: 'origin/master',
      path: '/srv/nuxt-web',
      'post-deploy':
        'yarn  && yarn build &&  pm2 startOrRestart ecosystem.config.js',
      'pre-deploy-local': "echo 'Deploy Done!'",
      env: {
        NODE_ENV: 'production',
      },
    },
  },
}
