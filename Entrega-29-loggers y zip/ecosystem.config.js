module.exports = {
  apps : [
    {
      name: 'app1',
      script: 'src/index.js',
      watch: true,
      args: '--puerto=8081' //modo fork porque no tiene instancias definidas
    },
    {
      name: 'app1',
      script: 'src/index.js',
      watch: true,
      instances: 4, //modo cluster porque tiene instancias definidas
      args: '--puerto=8082'
    }
  ]
};

