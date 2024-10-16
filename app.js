document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("itemInput");
    const addItemButton = document.getElementById("addItemButton");
    const itemList = document.getElementById("itemList");

    const savedItems = JSON.parse(localStorage.getItem("shoppingList")) || [];
    savedItems.forEach((item) => addItemToList(item.name, item.purchased));

    addItemButton.addEventListener("click", () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            addItemToList(itemName, false);
            saveItem(itemName, false);
            itemInput.value = "";
        }
    });

    function addItemToList(name, purchased) {
        const listItem = document.createElement("li");
        listItem.className = `flex justify-between items-center p-3 rounded-lg border ${purchased ? "bg-gray-200 line-through text-gray-500" : "bg-gray-100"} cursor-pointer`;
        listItem.textContent = name;

        listItem.addEventListener("click", () => {
            listItem.classList.toggle("line-through");
            listItem.classList.toggle("bg-gray-200");
            listItem.classList.toggle("text-gray-500");
            updateItemStatus(name, listItem.classList.contains("line-through"));
        });

        const removeButton = document.createElement("span");
        removeButton.className = "text-red-500 cursor-pointer ml-4 rounded p-2 hover:bg-gray-300";
        removeButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        removeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            listItem.remove();
            removeItem(name);
        });


        listItem.appendChild(removeButton);

        itemList.appendChild(listItem);
    }

    function saveItem(name, purchased) {
        const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
        shoppingList.push({ name, purchased });
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }

    function updateItemStatus(name, purchased) {
        const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
        const item = shoppingList.find((item) => item.name === name);
        if (item) {
            item.purchased = purchased;
            localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
        }
    }

    function removeItem(name) {
        const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
        const updatedList = shoppingList.filter((item) => item.name !== name);
        localStorage.setItem("shoppingList", JSON.stringify(updatedList));
    }
});
