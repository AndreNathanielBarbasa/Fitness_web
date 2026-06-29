document.getElementById('nutrition-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const foodInput = document.getElementById('food');
    const drinksInput = document.getElementById('drinks');

    const food = foodInput.value.toLowerCase();
    const drinks = drinksInput.value.toLowerCase();
    const amountFood = parseInt(document.getElementById('amount').value) || 1;
    const amountRice = parseInt(document.getElementById('rice').value) || 1;
    const amountDrinks = parseInt(document.getElementById('amount1').value) || 1;

    if (/[A-Z]/.test(foodInput.value) || /[A-Z]/.test(drinksInput.value)) {
        alert("Invalid input. Please enter small letters only.");
        return;
    }

    const nutritionInfo = {
        egg: { calories: 85, fats: 11, protein: 6, carbs: 0 },
        chicken: { calories: 165, fats: 3.6, protein: 31, carbs: 0 },
        lumpia: { calories: 130, fats: 8, protein: 3, carbs: 11 },
        turon: { calories: 140, fats: 5, protein: 2, carbs: 22 },
        bakemac: { calories: 250, fats: 10, protein: 12, carbs: 28 },
        carbonara: { calories: 310, fats: 14, protein: 13, carbs: 35 },
        lechon: { calories: 350, fats: 30, protein: 20, carbs: 0 },
        burger: { calories: 295, fats: 14, protein: 17, carbs: 26 },
        chickenBurger: { calories: 250, fats: 12, protein: 18, carbs: 21 },
        adobo: { calories: 230, fats: 15, protein: 20, carbs: 4 },
        friedchicken: { calories: 320, fats: 20, protein: 24, carbs: 11 },
        monggo: { calories: 120, fats: 2, protein: 8, carbs: 20 },
        rice: { calories: 130, fats: 0.3, protein: 2.7, carbs: 28 },
        cake: { calories: 260, fats: 10, protein: 3, carbs: 40 },
        mangopie: { calories: 290, fats: 15, protein: 4, carbs: 38 },
        hotdog: { calories: 150, fats: 13, protein: 5, carbs: 2 },
        sisig: { calories: 450, fats: 35, protein: 30, carbs: 10 },
        milkfish: { calories: 220, fats: 12, protein: 26, carbs: 0 },
        squid: { calories: 175, fats: 8, protein: 20, carbs: 5 },
        tuna: { calories: 200, fats: 9, protein: 29, carbs: 0 },
        tocino: { calories: 275, fats: 18, protein: 20, carbs: 10 } // Added Tocino
    };

    const drinkInfo = {
        coke: { calories: 140, fats: 0, protein: 0, carbs: 39 },
        mtdrew: { calories: 170, fats: 0, protein: 0, carbs: 46 },
        royal: { calories: 150, fats: 0, protein: 0, carbs: 40 },
        applejuice: { calories: 115, fats: 0.3, protein: 0.1, carbs: 28 },
        gulaman: { calories: 190, fats: 0.1, protein: 0, carbs: 48 },
        icetea: { calories: 90, fats: 0, protein: 0, carbs: 22 },
        icehoco: { calories: 120, fats: 3.5, protein: 2, carbs: 20 },
        yakult: { calories: 50, fats: 0, protein: 1, carbs: 12 },
        milk: { calories: 103, fats: 2.4, protein: 8, carbs: 12 },
        redhorse: { calories: 200, fats: 0, protein: 1, carbs: 15 },
        sanmig: { calories: 150, fats: 0, protein: 1, carbs: 11 },
        tanduay: { calories: 220, fats: 0, protein: 0, carbs: 0 },
        soju: { calories: 540, fats: 0, protein: 0, carbs: 40 },
        sprite: { calories: 140, fats: 0, protein: 0, carbs: 39 } // Added Sprite
    };

    const foodInfo = nutritionInfo[food];
    const drinkInfoData = drinkInfo[drinks];
    const riceInfo = nutritionInfo['rice'];

    if (!foodInfo && food !== 'rice' || !drinkInfoData) {
        alert("Oops! We couldn't find the item you entered.");
        return;
    }

    let totalCalories = 0;
    let totalFats = 0;
    let totalCarbs = 0;
    let totalProtein = 0;

    if (foodInfo) {
        totalCalories += foodInfo.calories * amountFood;
        totalFats += foodInfo.fats * amountFood;
        totalCarbs += foodInfo.carbs * amountFood;
        totalProtein += foodInfo.protein * amountFood;
    }

    if (drinkInfoData) {
        totalCalories += drinkInfoData.calories * amountDrinks;
        totalFats += drinkInfoData.fats * amountDrinks;
        totalCarbs += drinkInfoData.carbs * amountDrinks;
        totalProtein += drinkInfoData.protein * amountDrinks;
    }

    if (amountRice > 0) {
        totalCalories += riceInfo.calories * amountRice;
        totalFats += riceInfo.fats * amountRice;
        totalCarbs += riceInfo.carbs * amountRice;
        totalProtein += riceInfo.protein * amountRice;
    }

    document.getElementById('calories').textContent = `Total calories: ${totalCalories}`;
    document.getElementById('fat').textContent = `Total fats: ${totalFats} grams`;
    document.getElementById('carbs').textContent = `Total carbs: ${totalCarbs} grams`;
    document.getElementById('protein').textContent = `Total protein: ${totalProtein} grams`;
});

document.getElementById('clear').addEventListener('click', function() {
    document.getElementById('calories').textContent = 'Total calories:';
    document.getElementById('fat').textContent = 'Total fats:';
    document.getElementById('carbs').textContent = 'Total carbs:';
    document.getElementById('protein').textContent = 'Total protein:';
    document.getElementById('food').value = '';
    document.getElementById('drinks').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('rice').value = '';
    document.getElementById('amount1').value = '';
});

async function loadUsers() {
    console.log("Loading users...");

    try {
        const response = await fetch("http://127.0.0.1:8000/users");

        console.log("Status:", response.status);

        const users = await response.json();

        console.log("Users:", users);

    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

loadUsers();