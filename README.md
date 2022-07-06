# BUMBLE Inventory Viewer 

This is the web-based front-end for supporting cross-platform real-time collaborative modeling in the [BUMBLE](https://itea4.org/project/bumble.html) project. 

![BUMBLE collaborative engine](https://github.com/Yunabell-VU/BUMBLE-Inventory-Viewer-Bsc-Project/blob/master/demo/bumble%20collaboration%20engine.png)

## Prerequisites

The following libraries/frameworks need to be installed on your system:

| | |
|-|-|
|[Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)|`11`|
|[Node.js](https://nodejs.org/en/)|`<=16.15.1`|


## Run the project

### Front-end

```sh
npm install
npm run dev
```

### Server

To display contents and full functionalities of the project, the server need to be launched. 

```sh
cd server
java -jar org.eclipse.emfcloud.modelserver.example-0.7.0-SNAPSHOT-standalone.jar
```

## Demo


**Inventory page**:
![Inventory Instances](https://github.com/Yunabell-VU/BUMBLE-Inventory-Viewer-Bsc-Project/blob/master/demo/demo-inventory-instances.png)

**Inventory/structure/classes page**:
![Inventory Structure Classes](https://github.com/Yunabell-VU/BUMBLE-Inventory-Viewer-Bsc-Project/blob/master/demo/demo-inventory-structure-classes-full.png)

**Inventory/structure/enums page**:
![Inventory Structure Enums](https://github.com/Yunabell-VU/BUMBLE-Inventory-Viewer-Bsc-Project/blob/master/demo/demo-inventory-structure-enums-full.png)

**Sessions page**:
![Sessions](https://github.com/Yunabell-VU/BUMBLE-Inventory-Viewer-Bsc-Project/blob/master/demo/demo-sessions.png)

**Plugins page**:
![Plugins](https://github.com/Yunabell-VU/BUMBLE-Inventory-Viewer-Bsc-Project/blob/master/demo/demo-plugins.png)

**Example of add a new user**:
![Add instance](https://github.com/Yunabell-VU/BUMBLE-Inventory-Viewer-Bsc-Project/blob/master/demo/demo-new-user.png)
