

class RequireManager {
  static async handlerSubmit(route, body) {
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;

  }
  static async handlerFile(event, imageSel) {
    const file = event.target.files[0];    
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const imgElement = document.querySelector(imageSel);
            imgElement.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
  }

}
window.onload = () => {
  //----------------------------------------------//
  const fileInp = document.getElementById('image_file');

  fileInp.addEventListener('change', (event) => {
    RequireManager.handlerFile(event, '#imagePrew');
  });
 
};
