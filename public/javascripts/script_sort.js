class sortMAnager {
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

  static async handleSelect(option) {
    const response = await fetch('/products', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({option}),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  }

  static async deleteProd(id) {
    const response = await fetch(`/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.reload(true);
    const data = await response.json();
    return data;
  }
}

window.onload = () => {
  const select = document.querySelector('.products__sort');
  const userStatus = document.getElementById('user-status');

  let isLoggedIn;
  if (userStatus.dataset.id === 'true') {
    isLoggedIn = userStatus.dataset.id === 'true';
    console.log(isLoggedIn);
    
  }
  if (isLoggedIn) {
    select.classList.add('active');
  }
  select.addEventListener('change', (e) => {
    const option = e.target.value;
    console.log(option);
    
    sortMAnager.handleSelect(option);
    window.location.reload(true);
  });

  //-------------------------------------//
  const delBtn = document.querySelectorAll('.delete');
  delBtn.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.delete;      
      return await sortMAnager.deleteProd(id);
    });
  });
}