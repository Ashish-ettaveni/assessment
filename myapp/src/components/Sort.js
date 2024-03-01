
export const formatTime = (timeString) => {
    if (timeString) {
      const date = new Date(timeString);
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const seconds = date.getUTCSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    return '';
  };


export const sortDataByDate = (data, ascending) => {
    const sortedData = [...data];
  
    sortedData.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
  
      if (ascending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  
    return sortedData;
  };
  
  
  export const sortDataByTime = (data, ascending) => {
    const sortedData = [...data];
  
    sortedData.sort((a, b) => {
      const timeA = new Date(a.created_at).toLocaleTimeString('en-US', {
        hour12: false,
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
  
      const timeB = new Date(b.created_at).toLocaleTimeString('en-US', {
        hour12: false,
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
  
      if (ascending) {
        return timeA.localeCompare(timeB);
      } else {
        return timeB.localeCompare(timeA);
      }
    });
  
    return sortedData;
  };
  
  // export const sortDataByAge= (data,ascending) =>{
  //   const sortedData = [...data];
  //   sortedData.sort((a,b)=>{
  //     const ageA = a.age;
  //     const ageB = b.age;
  //     if(ageA < ageB){
  //       return ascending ? -1:1;
  //     }
  //     else{
  //       return ascending ? 1:-1;
  //     }
  //   });
  //   return sortedData
  //};
