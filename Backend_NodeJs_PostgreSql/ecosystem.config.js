module.exports = {
    apps: [
        {
            name: 'spgv-cain-api',
            script: 'server.js',
            instances: 3,
            autorestart: true,
            watch: false,
            max_memory_restart: '4G',
            exp_backoff_restart_delay: 100,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};