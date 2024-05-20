pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY_CREDENTIALS = 'DockerHubCred' 
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [[$class: 'CloneOption', timeout: 15]],
                    submoduleCfg: [],
                    userRemoteConfigs: [[url: 'https://github.com/saihemath2000/SPEMAJOR.git']]
                ])
            }
        }
        stage('Build Backend Services') {
            steps {
                script {
                    // Build each Spring Boot service
                    def services = ['question-service', 'contribute-service', 'quiz-service','service-registry','api-gateway','cloud-config-server']
                    for (service in services) {
                        dir(service) {
                            sh "mvn clean package"
                        }
                    }
                }
            }
        }
        
        stage('Test Backend Services') {
            steps {
                script {
                    // Test each Spring Boot service
                    def services = ['question-service', 'contribute-service', 'quiz-service','service-registry','api-gateway','cloud-config-server']
                    for (service in services) {
                        dir(service) {
                            sh "mvn test"
                        }
                    }
                }
            }
        }
        
        stage('Build and Test Frontend') {
            steps {
                script {
                    // Navigate to frontend directory
                    dir('frontend') {
                        // Install dependencies and build React app
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
        
        stage('Dockerize') {
            steps {
                script {
                    // Dockerize and push backend services
                    sh 'docker build -t saihemanth1997/question-service:0.0.1 ./question-service'
                    sh 'docker build -t saihemanth1997/contribute-service:0.0.1 ./contribute-service'
                    sh 'docker build -t saihemanth1997/quiz-service:0.0.1 ./quiz-service'
                    sh 'docker build -t saihemanth1997/front-end:0.0.1 ./frontend'
                    
                    // Dockerize other services
                    sh 'docker build -t saihemanth1997/config-server:0.0.1 ./cloud-config-server'
                    sh 'docker build -t saihemanth1997/service-registry:0.0.1 ./service-registry'
                    sh 'docker build -t saihemanth1997/api-gateway:0.0.1 ./api-gateway'
                }
            }
        }
        stage('docker push images'){
          steps{
              script{
                  docker.withRegistry('', 'DockerHubCred') {
                      sh 'docker push saihemanth1997/question-service:0.0.1'
                      sh 'docker push saihemanth1997/contribute-service:0.0.1'
                      sh 'docker push saihemanth1997/quiz-service:0.0.1'
                      sh 'docker push saihemanth1997/front-end:0.0.1'
                      sh 'docker push saihemanth1997/config-server:0.0.1'
                      sh 'docker push saihemanth1997/service-registry:0.0.1'
                      sh 'docker push saihemanth1997/api-gateway:0.0.1' 
                  }
              }
          }
        }
        
      stage('deploy to kubernetes') {
          steps {
             withKubeConfig(caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'k8-cred', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://192.168.49.2:8443') {
                sh "kubectl apply -f k8s/"
              }
          }
     }
      stage('verify the deployment') {
          steps {
             withKubeConfig(caCertificate: '', clusterName: 'minikube', contextName: '', credentialsId: 'k8-cred', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://192.168.49.2:8443') {
               sh "kubectl get pods -n webapps"     
             }
          }
     }   
}
}    
