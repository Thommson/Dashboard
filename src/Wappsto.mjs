let session = "cf6808c3-4249-400c-90c0-2039788166dc";
let wappsto = new window.Wappsto({
   session: session,
   baseUrl: "/services"
});

window.w = wappsto;

//Gets all networks add try catch
export async function getNetworks(){
  console.log('Getting devices');
  let networkCollection = await wappsto.get('network', {}, {
    quantity: 'all',
    expand: 4,
    subscribe: true
  });
  return getDevices(networkCollection);
}

//Add try catch
//Add message
export async function getAllDevices(){
  console.log('Getting all devices');
  let deviceCollection = await wappsto.get('device', {}, {
    quantity: 'all',
    expand: 4,
    subscribe: true
  });
  return deviceCollection;
}


//Get all devices from all networks
function getDevices(networkCollection){
  console.log(networkCollection);
  var allDeviceArray = [];
  //Loop counting amount of networks
  for(let networkIndex = 0; networkIndex < networkCollection.models.length; networkIndex++){
    //"Saving" the selected network
    let currentNetwork = networkCollection.models[networkIndex].get("device");
    //Loop counting amount of devices in the network
    for(let deviceIndex = 0; deviceIndex < currentNetwork.models.length; deviceIndex++){
      //Getting and pushing a device into an array
      let device = currentNetwork.models[deviceIndex];
      allDeviceArray.push(device);
    }
  }

  console.log(allDeviceArray);
  return allDeviceArray;
}


export async function getDataMaster(){
  console.log('data master started')
  let userData = await wappsto.get('data', {}, {
      expand: 5,
      quantity: 1,
      subscribe: true
      });
      return userData.first();
    }
