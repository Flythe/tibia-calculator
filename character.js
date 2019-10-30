class Character {
    mana = {
        "regeneration": {
            "unpromoted": {"mage": 2400, "knight": 1200, "paladin": 1800},
            "promoted": {"mage": 3600, "knight": 1200, "paladin": 2400},
            "dailyRewardsMultiplier": 2
        }
    }

    constructor(formValues) {
        this.formValues = formValues;
        this.food = new Food();
    }

    manaRegenPerHour() {
        const promotedKey = this.formValues.promoted ? "promoted" : "unpromoted";
        const dailyRewardsMultiplier = (this.formValues.dailyRewards ? this.mana.regeneration.dailyRewardsMultiplier : 1);
        const baseRegen = this.mana.regeneration[promotedKey][this.formValues.vocation] * dailyRewardsMultiplier;

        return baseRegen;
    }

    manaRegenPerMinute() {
        const baseRegen = this.manaRegenPerHour();
        const minuteRegen = Math.round(baseRegen / 60);

        return minuteRegen;
    }

    manaRegenPerSecond() {
        const baseRegen = this.manaRegenPerMinute();
        const secondRegen = Math.round(baseRegen / 60);

        return secondRegen;
    }

    foodForMana(mana) {
        const secondRegen = this.manaRegenPerSecond();
        const manaPerFoodItem = this.food[this.formValues.food].regen * secondRegen;

        return Math.ceil(mana / manaPerFoodItem);
    }
}