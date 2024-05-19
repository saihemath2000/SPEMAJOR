FROM openjdk:17
ARG JAR_FILE=target/config-server-0.0.1.jar
COPY ${JAR_FILE} /app/
WORKDIR /app
ENTRYPOINT ["java","-jar","config-server-0.0.1.jar"]
EXPOSE 9296
