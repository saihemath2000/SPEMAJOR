FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} contribute-service.jar
ENTRYPOINT ["java","-jar","/contribute-service.jar"]
EXPOSE 8082