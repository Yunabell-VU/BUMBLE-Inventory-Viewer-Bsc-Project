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