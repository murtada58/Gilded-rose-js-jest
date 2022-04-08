class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Shop {
    constructor(items = []) {
        items.forEach((item) => this.keepItemQualityWithinBounds(item));
        this.items = items;
    }

    updateAllItems() {
        this.items.forEach((item) => {
            item.sellIn--;
            this.updateItemQuality(item);
        });
    }

    keepItemQualityWithinBounds(item) {
        if (item.name.includes("Sulfuras")) {
            return;
        }
        item.quality = Math.min(50, Math.max(item.quality, 0));
    }

    updateItemQuality(item) {
        update(item);
        this.keepItemQualityWithinBounds(item);

        function update(item) {
            if (item.name.includes("Sulfuras")) {
                return;
            }

            if (item.name.includes("Backstage pass")) {
                updateBackstagePassQuality(item);
                return;
            }

            if (item.name === "Aged Brie") {
                updateGeneralItemQuality(item, 1);
                return;
            }

            updateGeneralItemQuality(item, -1);

            function updateBackstagePassQuality(item) {
                item.quality++;
                if (item.sellIn <= 10) {
                    item.quality++;
                }
                if (item.sellIn <= 5) {
                    item.quality++;
                }

                if (item.sellIn < 0) {
                    item.quality = 0;
                }
            }

            function updateGeneralItemQuality(item, changeAmount) {
                if (item.name.includes("Conjured")) {
                    changeAmount *= 2;
                }

                if (item.sellIn < 0) {
                    item.quality += 2 * changeAmount;
                } else {
                    item.quality += changeAmount;
                }
            }
        }
    }
}

module.exports = {
    Item,
    Shop,
};
