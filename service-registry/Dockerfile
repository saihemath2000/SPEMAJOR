FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} /app/
WORKDIR /app
ENTRYPOINT ["java","-jar","service-registry.jar"]
EXPOSE 8761
