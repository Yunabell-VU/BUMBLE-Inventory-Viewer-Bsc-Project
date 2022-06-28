import { put } from "../utils/request";
import newInstanceTemplates from "../static/newInstanceTemplates.json";

export const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

export const getNewId = (instances) => {
    let ids = [];

    for (var i = 0; i < instances.length; i++) {
      ids.push(instances[i].id);
    }

    ids.sort();
    
    for (var i = 0; i < ids.length; i++) {
      if (ids[i] != i + 1) {
        return i + 1;
      }
    }
    return ids.length + 1;
  }

export function getLanguage(inventory, model)  {
  const confirmsTo = model.confirmsTo;
  const languageID = confirmsTo.$ref;

  const language = inventory.language.filter(
    (item) => item.$id === languageID
  );

  if (language.length > 0) {
    return language[0];
  }

  return language.push({});
}

export function deleteInstance(inventory, className, reference, instanceID) {
  const newInstances = inventory[className].filter(
    (instance) => instance[reference] !== instanceID
  );

  inventory[className] = newInstances;

  const data = { data: inventory };

  put(`/models/?modeluri=ModelInventory.xmi`, JSON.stringify(data));
}

export function saveNewInstance(inventory, className, newInstance, isIdRequired) {
  if(isIdRequired) {
    newInstance.id = getNewId(inventory[className])
  }

  inventory[className].push(newInstance)

  const data = { data: inventory };

  put(`/models/?modeluri=ModelInventory.xmi`, JSON.stringify(data));
}

export function updateInstance(inventory, className, newInstance) {
  const index = inventory[className].findIndex(item => item.$id === newInstance.$id)

  inventory[className].splice(index,1,newInstance)

  const data = { data: inventory };

  put(`/models/?modeluri=ModelInventory.xmi`, JSON.stringify(data));
}

export function getNewInstanceTemplate(className) {
  const cleanTemplates = JSON.parse(JSON.stringify(newInstanceTemplates))
  return cleanTemplates[className]
}