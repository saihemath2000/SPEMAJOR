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
                    extensions: [],
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
                    sh 'docker build -t saihemanth1997/question-service ./question-service'
                    sh 'docker build -t saihemanth1997/contribute-service ./contribute-service'
                    sh 'docker build -t saihemanth1997/quiz-service ./quiz-service'
                    sh 'docker build -t saihemanth1997/front-end ./frontend'
                    
                    // Dockerize other services
                    sh 'docker build -t saihemanth1997/config-server ./cloud-config-server'
                    sh 'docker build -t saihemanth1997/service-registry ./service-registry'
                    sh 'docker build -t saihemanth1997/api-gateway ./api-gateway'
                }
            }
        }
        stage('docker push images'){
          steps{
              script{
                  docker.withRegistry('', 'DockerHubCred') {
                      sh 'docker push saihemanth1997/question-service'
                      sh 'docker push saihemanth1997/contribute-service'
                      sh 'docker push saihemanth1997/quiz-service'
                      sh 'docker push saihemanth1997/front-end'
                      sh 'docker push saihemanth1997/config-server'
                      sh 'docker push saihemanth1997/service-registry'
                      sh 'docker push saihemanth1997/api-gateway' 
                  }
              }
          }
        }
        
        stage('Deploy to Minikube') {
            steps {
                // Apply Kubernetes manifests from k8s folder
                script {
                    sh 'kubectl apply -f k8s/'
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup
            script {
                sh 'kubectl delete -f k8s/'
            }
        }
    }
}
