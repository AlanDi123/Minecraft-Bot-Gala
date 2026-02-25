module.exports = {
    apps: [{
        name: 'gala-bot',
        script: './src/index.js',
        watch: false,
        max_memory_restart: '512M',
        restart_delay: 5000,
        max_restarts: 10,
        env: {
            NODE_ENV: 'production',
            LOG_LEVEL: 'info'
        },
        env_development: {
            NODE_ENV: 'development',
            LOG_LEVEL: 'debug'
        }
    }]
};
