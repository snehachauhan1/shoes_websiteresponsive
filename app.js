const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

document.addEventListener('DOMContentLoaded', () => {
  const products = {
      "AIR FORCE": {
          img: "air.png",
          title: "AIR FORCE",
          price: "199",
          desc: "Lorem ipsum dolor sit amet consectetur impal adipisicing elit. Alias assumenda dolorum doloremque sapiente aliquid aperiam.",
          colors: ["color1", "color2"],
          sizes: [42, 43, 44]
      },
      "JORDAN": {
          img: "jordan.png",
          title: "AIR JORDAN",
          price: "149",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias assumenda dolorum doloremque sapiente aliquid aperiam.",
          colors: ["color3", "color4"],
          sizes: [40, 41, 42]
      },
      "BLAZER": {
          img: "blazer.png",
          title: "BLAZER",
          price: "109",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias assumenda dolorum doloremque sapiente aliquid aperiam.",
          colors: ["color5", "color6"],
          sizes: [38, 39, 40]
      },
      "CRATER": {
          img: "crater.png",
          title: "CRATER",
          price: "129",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias assumenda dolorum doloremque sapiente aliquid aperiam.",
          colors: ["color7", "color8"],
          sizes: [42, 43, 44]
      },
      "HIPPIE": {
          img: "hippie.png",
          title: "HIPPIE",
          price: "99",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias assumenda dolorum doloremque sapiente aliquid aperiam.",
          colors: ["color9", "color10"],
          sizes: [41, 42, 43]
      }
  };

  // Select initial product
  let chosenProduct = products["AIR FORCE"];
  const currentProductImg = document.querySelector(".productImg");
  const currentProductTitle = document.querySelector(".productTitle");
  const currentProductPrice = document.querySelector(".productPrice");
  const currentProductColors = document.querySelector(".colors");
  const currentProductSizes = document.querySelector(".sizes");

  // Event listener for menu items
  menuItems.forEach((item, index) => {
      item.addEventListener("click", () => {
          // Update wrapper transform
          wrapper.style.transform = `translateX(${-100 * index}vw)`;

          // Change the chosen product based on the clicked item
          chosenProduct = products[item.innerText];

          // Update product details
          currentProductTitle.textContent = chosenProduct.title;
          currentProductPrice.textContent = "$" + chosenProduct.price;
          currentProductImg.src = chosenProduct.img;

          // Assign new colors
          currentProductColors.innerHTML = ''; // Clear existing colors
          chosenProduct.colors.forEach(color => {
              const colorDiv = document.createElement('div');
              colorDiv.className = `color ${color}`;
              colorDiv.style.backgroundColor = color; // Assuming color is a valid CSS color code
              currentProductColors.appendChild(colorDiv);

              // Add event listener to change image on color click
              colorDiv.addEventListener("click", () => {
                  currentProductImg.src = chosenProduct.img; // Assuming same image for all colors
              });
          });

          // Update sizes
          currentProductSizes.innerHTML = ''; // Clear existing sizes
          chosenProduct.sizes.forEach(size => {
              const sizeDiv = document.createElement('div');
              sizeDiv.className = 'size';
              sizeDiv.textContent = size;
              currentProductSizes.appendChild(sizeDiv);

              // Add event listener to select size
              sizeDiv.addEventListener("click", () => {
                  currentProductSizes.querySelectorAll('.size').forEach(s => {
                      s.style.backgroundColor = "white";
                      s.style.color = "black";
                  });
                  sizeDiv.style.backgroundColor = "black";
                  sizeDiv.style.color = "white";
              });
          });
      });
  });

  // Event listeners for the Buy Now button and payment modal
  const productButton = document.querySelector(".productButton");
  const payment = document.querySelector(".payment");
  const close = document.querySelector(".close");

  productButton.addEventListener("click", () => {
      payment.style.display = "flex";
  });

  close.addEventListener("click", () => {
      payment.style.display = "none";
  });
});
