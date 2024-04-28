FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} contribute-service.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/contribute-service.jar"]
