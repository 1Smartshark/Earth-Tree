addLayer("d", {
    name: "dirt", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "Brown",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "dirt", // Name of prestige currency
    baseResource: "grass", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('d', 14)) mult = mult.times(upgradeEffect('d', 14))
        if (hasUpgrade('s', 12)) mult = mult.times(upgradeEffect('s', 12))
        if (hasUpgrade('s', 13)) mult = mult.times(2)
        if (hasUpgrade('c', 21)) mult = mult.times(2)
        if (hasUpgrade('c', 24)) mult = mult.times(3)
        if (hasUpgrade('s', 22)) mult = mult.times(2)
        if (hasUpgrade('s', 21)) mult = mult.times(3)
        if (hasMilestone('sl', 2)) mult = mult.times(2)
        if (hasMilestone('g', 2)) mult = mult.times(4)
        if (hasChallenge('i', 11)) mult = mult.times(5)
            if (hasAchievement('a', 13)) mult = mult.times(1.25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for dirt", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {return (hasMilestone("g", 1))},
    doReset(resettingLayer) {
        let keep = [];
        if (hasUpgrade("sl", 12) && resettingLayer=="s") keep.push("upgrades")
        if (hasUpgrade("sl", 13) && resettingLayer=="c") keep.push("upgrades")
        if (hasUpgrade("sl", 14) && resettingLayer=="sl") keep.push("upgrades")
        if (hasMilestone("g", 1) && resettingLayer=="sl") keep.push("upgrades")
        if (hasMilestone("g", 1) && resettingLayer=="c") keep.push("upgrades")
        if (hasMilestone("g", 1) && resettingLayer=="co") keep.push("upgrades")
        if (hasMilestone("g", 1) && resettingLayer=="s") keep.push("upgrades")
        if (hasMilestone("g", 1) && resettingLayer=="t") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("d", keep)
    },
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Grass Seeds",
            description: "Double your grass gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Dirty Grass",
            description: "Grass gain is boosted by dirt.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect     
            unlocked() { return hasUpgrade("d", 11) },   
        },
        13: {
            title: "Grass Seeds II",
            description: "Double your grass gain.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("d", 12) },
        },
        14: {
            title: "Grass-Covered Dirt",
            description: "Dirt gain is slightly boosted by grass.",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.015)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { return hasUpgrade("d", 13) },
        },
        21: {
            title: "Grass Sprout",
            description: "Triple your grass gain.",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("s", 23) && hasUpgrade("d", 14)  && !inChallenge('i', 22) },
        },
        22: {
            title: "Mining Moss",
            description: "Double your stone gain.",
            cost: new Decimal(500),
            unlocked() { return hasUpgrade("d", 21) },
        },
        23: {
            title: "Gardening",
            description: "Quadruple your grass gain.",
            cost: new Decimal(1250),
            unlocked() { return hasUpgrade("d", 22) },
        },
        24: {
            title: "Shovels",
            description: "Double your grass gain.",
            cost: new Decimal(2500),
            unlocked() { return hasUpgrade("d", 23) },
        },
        31: {
            title: "Grass Sapling",
            description: "Sextuple your grass gain.",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade("d", 24) },
        },
        32: {
            title: "Growing",
            description: "Unlock trees.",
            cost: new Decimal(33333),
            unlocked() { return hasUpgrade("d", 31) },
        },
        33: {
            title: "Dark Moss",
            description: "Double coal gain.",
            cost: new Decimal(100e3),
            unlocked() { return hasUpgrade("d", 32) && hasMilestone("sl", 8) },
        },
    },
})
addLayer("s", {
    name: "stone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
       
    }},
    color: "Gray",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "stone", // Name of prestige currency
    baseResource: "dirt", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource

    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 14)) mult = mult.times(2)
        if (hasUpgrade('s', 31)) mult = mult.times(3)
        if (hasUpgrade('c', 13)) mult = mult.times(2)
        if (hasUpgrade('c', 14)) mult = mult.times(2)
        if (hasUpgrade('c', 22)) mult = mult.times(2)
        if (hasUpgrade('d', 22)) mult = mult.times(2)
        if (hasUpgrade('co', 11)) mult = mult.times(2)
        if (hasUpgrade('co', 13)) mult = mult.times(2)
        if (hasMilestone('sl', 0)) mult = mult.times(2)
        if (hasMilestone('sl', 11)) mult = mult.times(3)
        if (hasMilestone('g', 0)) mult = mult.times(2)
        if (hasMilestone('g', 1)) mult = mult.times(3)
        if (hasChallenge('i', 11)) mult = mult.times(4)
        if (hasAchievement('a', 23)) mult = mult.times(1.25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Stone", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone('sl', 6) && resettingLayer=="sl") keep.push("upgrades")
        if (hasMilestone("g", 1) && resettingLayer=="sl") keep.push("upgrades")
        if (hasMilestone("g", 1) && resettingLayer=="co") keep.push("upgrades")
        if (hasMilestone("g", 1) && resettingLayer=="t") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("s", keep)
    },
    layerShown(){return player.d.unlocked},
    upgrades: {
        11: {
            title: "Stone Plants",
            description: "Double your grass gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Buried Dirt",
            description: "Dirt gain is slightly boosted by stone.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
            unlocked() { return hasUpgrade("s", 11) },       
        },
        13: {
            title: "Rocky Dirt",
            description: "Double your dirt gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("s", 12) },
        },
        14: {
            title: "Sharpened Stone",
            description: "Double stone gain.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("s", 13) },
        },
        21: {
            title: "More Dirt",
            description: "Triple dirt gain.",
            cost: new Decimal(7),
            unlocked() { return hasUpgrade("s", 14) },
        },
        22: {
            title: "Smooth Dirt",
            description: "Double dirt gain.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("s", 21) },
        },
        23: {
            title: "Dirt*2",
            description: "Unlock more dirt upgrades",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("s", 22) },
        },
        24: {
            title: "Blackstone",
            description: "Double coal.",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("s", 23) && hasUpgrade("i",12) },
        },
        31: {
            title: "Bigger boulders",
            description: "Triple stone.",
            cost: new Decimal(5000),
            unlocked() { return hasUpgrade("s", 24) && hasUpgrade("i",12) && hasUpgrade("co",11) },
        },
    },
})
addLayer("t", {
    name: "tree", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
       
    }},
    color: "Green",
    requires: new Decimal(50000), // Can be a function that takes requirement increases into account
    resource: "trees", // Name of prestige currency
    baseResource: "dirt", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource

    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone('sl', 7)) mult = mult.times(2)
        if (hasUpgrade('co', 14)) mult = mult.times(0.5)
        if (hasMilestone('sl', 9)) mult = mult.times(2)
        if (hasMilestone('g', 3)) mult = mult.times(2)
        if (hasChallenge('i', 12)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for Trees", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (hasUpgrade('i', 11) && resettingLayer=="g") keep.push("upgrades")
        if (hasUpgrade('i', 11) && resettingLayer=="i") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("t", keep)
    },
    layerShown(){return hasUpgrade('d', 32) && !inChallenge('i', 12) && !inChallenge('i', 21) || player.g.unlocked && !inChallenge('i', 12) && !inChallenge('i', 21)},
    upgrades: {
        11: {
            title: "Tree Seeds",
            description: "Double your grass gain.",
            cost: new Decimal(1),
            unlocked() {return !inChallenge('i', 22)}
        },
        12: {
            title: "Growth",
            description: "Grass gain is boosed by trees.",
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect     
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("t", 11) },
        },
    },
})
addLayer("sl", {
    name: "Slate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sl", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
       
    }},
    color: "#454545",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "slate", // Name of prestige currency
    baseResource: "stone", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource

    
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S+Shift: Reset for Slate", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (hasUpgrade('i', 11) && resettingLayer=="g") keep.push("upgrades")
        if (hasUpgrade('i', 11) && resettingLayer=="i") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("sl", keep)
    },
    layerShown(){return player.s.unlocked && !inChallenge('i', 21)},
    milestones: {
        0: {
            requirementDescription: "1 Slate",
            done() { return player.sl.points.gte(1) && player.s.unlocked },
            effectDescription: "Double stone.",
            unlocked() {return player.s.unlocked},
        },
        1: {
            requirementDescription: "2 Slate",
            done() { return player.sl.points.gte(2) && player.c.unlocked },
            effectDescription: "Double clay.",
            unlocked() {return player.c.unlocked},
        },
        2: {
            requirementDescription: "3 Slate",
            done() { return player.sl.points.gte(3) && player.d.unlocked },
            effectDescription: "Double dirt.",
            unlocked() {return player.d.unlocked},
        },
        3: {
            requirementDescription: "4 Slate",
            done() { return player.sl.points.gte(4) },
            effectDescription: "Double grass.",
        },
        4: {
            requirementDescription: "5 Slate",
            done() { return player.sl.points.gte(5) && player.co.unlocked },
            effectDescription: "Unlock coal upgrades.",
            unlocked() {return player.co.unlocked},
            
        },
        5: {
            requirementDescription: "6 Slate",
            done() { return player.sl.points.gte(6) && player.co.unlocked },
            effectDescription: "Double coal.",
            unlocked() {return player.co.unlocked },
        },
        6: {
            requirementDescription: "8 Slate",
            unlocked() { return hasUpgrade("sl", 21) },
            done() { return player.sl.points.gte(8) && hasUpgrade("sl", 21) },
            effectDescription: "Keep stone & clay upgrades on slate.",
        },
        7: {
            requirementDescription: "9 Slate",
            unlocked() {return player.t.unlocked},
            done() { return player.sl.points.gte(9) && player.t.unlocked },
            effectDescription: "Double trees.",
        },
        8: {
            requirementDescription: "11 Slate",
            unlocked() {return hasUpgrade("co", 14)},
            done() { return player.sl.points.gte(11) && hasUpgrade("co", 14) },
            effectDescription: "Remove the Fire-Infused Tools debuff, and unlock a new grass upgrade.",
        },
        9: {
            requirementDescription: "14 Slate",
            unlocked() {return hasUpgrade("co", 14)},
            done() { return player.sl.points.gte(14) && hasUpgrade("co", 14)},
            effectDescription: "Remove the Pollution debuff.",
        },
        10: {
            requirementDescription: "16 Slate",
            unlocked() {return hasUpgrade("sl", 21)},
            done() { return player.sl.points.gte(16) && hasUpgrade("sl", 21)},
            effectDescription: "Double stone, double coal.",
        },
        11: {
            requirementDescription: "20 Slate",
            unlocked() {return hasUpgrade("sl", 21)},
            done() { return player.sl.points.gte(20) && hasUpgrade("sl", 21)},
            effectDescription: "Triple dirt & grass.",
        },
    },
    upgrades: {
        11: {
            title: "Slated Grass",
            description: "Double your grass gain.",
            cost: new Decimal(2),
            unlocked() {return !inChallenge('i', 22)}
        },
        12: {
            title: "Stone-Covered Dirt",
            description: "Dirt upgrades are kept on stone.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("sl", 11) },
        },
        13: {
            title: "Clay-Covered Dirt",
            description: "Dirt upgrades are kept on clay.",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade("sl", 11) },
        },
        14: {
            title: "Slate-Covered Dirt",
            description: "Dirt upgrades are kept on slate.",
            cost: new Decimal(7),
            unlocked() { return hasUpgrade("sl", 11) },
        },
        21: {
            title: "Slate Pillar",
            description: "Unlock 3 more milestones.",
            cost: new Decimal(7),
            unlocked() { return hasUpgrade("sl", 11) && hasUpgrade("sl", 12) },
        },
    }
})
addLayer("c", {
    name: "clay", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
       
    }},
    color: "Gray",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "clay", // Name of prestige currency
    baseResource: "dirt", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource

    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('c', 12)) mult = mult.times(4)
        if (hasMilestone('sl', 1)) mult = mult.times(2)
        if (hasMilestone('g', 2)) mult = mult.times(3)
            
        if (hasChallenge('i', 12)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for Clay", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone('sl', 6) && resettingLayer=="sl") keep.push("upgrades")
        if (hasMilestone("g", 2) && resettingLayer=="co") keep.push("upgrades")
        if (hasMilestone("g", 2) && resettingLayer=="t") keep.push("upgrades")
        if (hasMilestone("g", 2) && resettingLayer=="sl") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("c", keep)
    },
    layerShown(){return player.d.unlocked && !inChallenge('i', 12)},

    upgrades: {
        11: {
            title: "Overgrown Bricks",
            description: "Double your grass gain",
            cost: new Decimal(1),
            unlocked() {return !inChallenge('i', 22)}
        },
        12: {
            title: "Clay Block",
            description: "Quadruple your clay gain.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("c", 11)}, 
        },
        13: {
            title: "Claystone",
            description: "Double stone gain.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("c", 12)}, 
        },
        14: {
            title: "Hardened Bricks",
            description: "Double stone gain.",
            cost: new Decimal(40),
            unlocked() { return hasUpgrade("c", 13)}, 
        },
        21: {
            title: "Dirty Bricks I",
            description: "Double dirt gain.",
            cost: new Decimal(80),
            unlocked() { return hasUpgrade("c", 14)}, 
        },
        22: {
            title: "Rocky Clay",
            description: "Double stone gain, but disable Charred Clay.",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("c", 21) && !hasUpgrade("c", 23)}, 
        },
        23: {
            title: "Charred Clay",
            description: "Double coal gain, but disable Rocky Clay.",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("c", 21) && !hasUpgrade("c", 22)}, 
        },
        24: {
            title: "Dirty Bricks II",
            description: "Triple dirt gain.",
            cost: new Decimal(250),
            unlocked() { return hasUpgrade("c", 22) || hasUpgrade("c", 23)}, 
        },
    },
})
addLayer("co", {
    name: "coal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Co", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        
    }},
    color: "#1c1c1c",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "coal", // Name of prestige currency
    baseResource: "stone", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource

    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('co', 12)) mult = mult.times(2)
        if (hasUpgrade('c', 23)) mult = mult.times(2)
        if (hasUpgrade('s', 24)) mult = mult.times(2)
        if (hasMilestone('sl', 5)) mult = mult.times(2)
        if (hasMilestone('sl', 10)) mult = mult.times(2)
        if (hasMilestone('g', 0)) mult = mult.times(2)
        if (hasChallenge('i', 11)) mult = mult.times(2)
        if (hasAchievement('a', 34)) mult = mult.times(1.25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "C", description: "C+Shift: Reset for Coal", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.sl.unlocked && !inChallenge('i', 21)},

    upgrades: {
        11: {
            title: "Boulders",
            description: "Double your stone gain.",
            cost: new Decimal(1),
            unlocked() { return hasMilestone('sl', 4) }, 
        },
        12: {
            title: "Vein Finder",
            description: "Double your coal gain.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("co", 11)}, 
        },
        13: {
            title: "Fire-Infused Tools",
            description: "0.5x Grass, 2x Stone, Unlock glass.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("co", 12)}, 
        },
        14: {
            title: "Pollution",
            description: "0.5x Grass, 0.5x Trees, 2x Stone, 2x Coal, Unlock a new slate milestone.",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade("co", 13)}, 
        },
    },
})
addLayer("g", {
    name: "glass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        
    }},
    color: "#B3FFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "glass", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() {return player.co.points}, // Get the current amount of baseResource

    
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 10, // Gain
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for Glass", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        player.sl.milestones = []; 
        if (layers[resettingLayer].row > this.row) layerDataReset("g", keep)
    },
    layerShown(){return hasUpgrade("co", 13) && !inChallenge('i', 21) || player.g.unlocked && !inChallenge('i', 21) },
    milestones: {
        0: {
            requirementDescription: "1 Glass",
            done() { return player.g.points.gte(1) && player.co.unlocked },
            effectDescription: "Double coal & stone. Trees & glass are now permanently visible (this will permanently save, even after the milestone is gone).",
            unlocked() {return player.co.unlocked},
        },
        1: {
            requirementDescription: "2 Glass",
            done() { return player.g.points.gte(2) && player.s.unlocked && player.d.unlocked },
            effectDescription: "Keep dirt & stone upgrades on all previous resets, and finally auto generate dirt.",
            unlocked() {return player.s.unlocked && player.d.unlocked },
        },
        2: {
            requirementDescription: "3 Glass",
            done() { return player.g.points.gte(3) && player.s.unlocked && player.c.unlocked && player.co.unlocked && player.d.unlocked },
            effectDescription: "Keep clay upgrades on all previous resets, and triple stone & clay, while quadrupling grass & dirt, along with double coal.",
            unlocked() {return player.s.unlocked && player.c.unlocked && player.co.unlocked && player.d.unlocked },
        },
        3: {
            requirementDescription: "4 Glass",
            done() { return player.g.points.gte(4) && player.t.unlocked},
            effectDescription: "Quadruple grass, double trees (yes this is basically slate 11 & 14). Unlock iron.",
            unlocked() {return player.t.unlocked },
        },
        4: {
            requirementDescription: "5 Glass",
            done() { return player.g.points.gte(5) && player.i.unlocked  },
            effectDescription: "Unlock iron challenge #4.",
            unlocked() {return player.i.unlocked },
        },
    },
})
addLayer("i", {
    name: "iron", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        
    }},
    color: "#999999",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "iron", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() {return player.co.points}, // Get the current amount of baseResource

    
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for Iron", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        player.sl.milestones = []; 
        if (layers[resettingLayer].row > this.row) layerDataReset("i", keep)
    },
    layerShown(){return hasMilestone('g', 3) || inChallenge('i', 11) || hasChallenge('i', 11)},

    upgrades: {
        11: {
            title: "Iron-Covered Slate",
            description: "Keep slate & tree upgrades on glass & iron. Unlock a challenge!",
            cost: new Decimal(1),
        },
        12: {
            title: "Stone*2",
            description: "Unlock more stone upgrades.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("i", 11)}, 
        },
        13: {
            title: "2Saver",
            description: "soon",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("i", 12) && hasChallenge("i", 21)}, 
        },
    },
    challenges: {
        11: {
            name: "Starting",
            challengeDescription: "Hard reset but only glass and below",
            goalDescription: "20 Coal",
            canComplete: function() {return player.co.points.gte(20)},
            rewardDescription: "Triple Coal, Quadruple Stone, Quintuple Dirt. Iron & this challenge area visible as long as this challenge is entered/completed.",
            unlocked() { return hasUpgrade("i", 11) || inChallenge('i', 11) || hasChallenge('i', 11)}, 
            onEnter() { 
                player.points = new Decimal("0"); 
                player.d.points = new Decimal("0"); 
                player.d.upgrades = []; 
                player.s.points = new Decimal("0"); 
                player.s.upgrades = [];
                player.c.points = new Decimal("0"); 
                player.c.upgrades = []; 
                player.sl.points = new Decimal("0"); 
                player.sl.upgrades = []; 
                player.sl.milestones = []; 
                player.co.points = new Decimal("0"); 
                player.co.upgrades = [];
                player.t.points = new Decimal("0"); 
                player.t.upgrades = []; 
                player.g.points = new Decimal("0"); 
                player.g.upgrades = []; 
                player.g.milestones = []; 
            },
        },
        12: {
            name: "Extraless",
            challengeDescription: "Effect of starting, but also lose access to clay and trees.",
            goalDescription: "20 Coal",
            canComplete: function() {return player.co.points.gte(20)},
            rewardDescription: "Triple clay & trees. Unlock the first permanent choice (hint: check below achivements).",
            unlocked() { return hasChallenge('i', 11)}, 
            onEnter() { 
                player.points = new Decimal("0"); 
                player.d.points = new Decimal("0"); 
                player.d.upgrades = []; 
                player.s.points = new Decimal("0"); 
                player.s.upgrades = [];
                player.c.points = new Decimal("0"); 
                player.c.upgrades = []; 
                player.sl.points = new Decimal("0"); 
                player.sl.upgrades = []; 
                player.sl.milestones = []; 
                player.co.points = new Decimal("0"); 
                player.co.upgrades = [];
                player.t.points = new Decimal("0"); 
                player.t.upgrades = []; 
                player.g.points = new Decimal("0"); 
                player.g.upgrades = []; 
                player.g.milestones = []; 
            },
        },
        21: {
            name: "Dissapearence",
            challengeDescription: "Extraless cranked to 11. Lose access to row 3+.",
            goalDescription: "1,000 Stone",
            canComplete: function() {return player.s.points.gte(1000)},
            rewardDescription: "Unlock a iron upgrade (will work soon).",
            unlocked() { return hasChallenge('i', 12)}, 
            onEnter() { 
                player.points = new Decimal("0"); 
                player.d.points = new Decimal("0"); 
                player.d.upgrades = []; 
                player.s.points = new Decimal("0"); 
                player.s.upgrades = [];
                player.c.points = new Decimal("0"); 
                player.c.upgrades = []; 
                player.sl.points = new Decimal("0"); 
                player.sl.upgrades = []; 
                player.sl.milestones = []; 
                player.co.points = new Decimal("0"); 
                player.co.upgrades = [];
                player.t.points = new Decimal("0"); 
                player.t.upgrades = []; 
                player.g.points = new Decimal("0"); 
                player.g.upgrades = []; 
                player.g.milestones = []; 
            },
        },
        22: {
            name: "Upgrades-",
            challengeDescription: "Disable slate, tree, and clay upgrades, along with disabling grass upgrades 5+. (this one takes ur iron upgrades too so gl)",
            goalDescription: "20 Coal",
            canComplete: function() {return player.co.points.gte("20")},
            rewardDescription: "Unlock steel.",
            unlocked() { return hasChallenge('i', 21) && hasMilestone('g', 4) || inChallenge('i', 22) || hasChallenge('i', 22)}, 
            onEnter() { 
                player.points = new Decimal("0"); 
                player.d.points = new Decimal("0"); 
                player.d.upgrades = []; 
                player.s.points = new Decimal("0"); 
                player.s.upgrades = [];
                player.c.points = new Decimal("0"); 
                player.c.upgrades = []; 
                player.sl.points = new Decimal("0"); 
                player.sl.upgrades = []; 
                player.sl.milestones = []; 
                player.co.points = new Decimal("0"); 
                player.co.upgrades = [];
                player.t.points = new Decimal("0"); 
                player.t.upgrades = []; 
                player.g.points = new Decimal("0"); 
                player.g.upgrades = []; 
                player.g.milestones = []; 
                player.i.points = new Decimal("0"); 
                player.i.upgrades = []; 
            },
        },
    }
})
addLayer("b", {
    name: "bonus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        
    }},
    color: "green",
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "bonuses", // Name of prestige currency
    baseResource: "grass", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource

    
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.points.gte(1) || player.b.unlocked},

    upgrades: {
        11: {
            title: "Bonus #1",
            description: "Double dirt gain.",
            cost: new Decimal(3),
        },
        12: {
            title: "Bonus #2",
            description: "Double stone gain.",
            cost: new Decimal(4),
        },
        13: {
            title: "Bonus #3",
            description: "Double clay gain.",
            cost: new Decimal(5),
        },
        14: {
            title: "Bonus #4",
            description: "Double coal gain.",
            cost: new Decimal(6),
        },
        21: {
            title: "Bonus #5",
            description: "Double tree gain.",
            cost: new Decimal(7),
        },
        22: {
            title: "Bonus #6",
            description: "Double iron gain.",
            cost: new Decimal(8),
        },
    },
})
addLayer("ch", {
    name: "choice", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        
    }},
    color: "yellow",
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "choices", // Name of prestige currency
    baseResource: "grass", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource

    
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 1000,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasChallenge('i', 12)},

    upgrades: {
        11: {
            title: "Iron",
            description: "Double iron gain. (soon)",
            cost: new Decimal(0),
            unlocked() { return hasChallenge("i", 12) && !hasUpgrade("ch", 12)}, 
        },
        12: {
            title: "Coal",
            description: "Quadruple coal gain. (soon)",
            cost: new Decimal(0),
            unlocked() { return hasChallenge("i", 12) && !hasUpgrade("ch", 11)}, 
        },
    },
})
addLayer("a", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievements: {
        11: {
            name: "Growth",
            done() { return player.d.points.gt(0) },
            tooltip: "Perform a Dirt reset.",
            image: "",
        },
        12: {
            name: "Grass Grower",
            done() { return player.points.gte(1000) },
            tooltip: "Reach 1,000 Grass.",
            image: "",
        },
        13: {
            name: "Stonify",
            done() { return player.s.points.gt(0) },
            tooltip: "Obtain stone. Reward: 1.25x Dirt",
            image: "",
        },
        14: {
            name: "Dirt+",
            done() { return hasUpgrade('d', 21) },
            tooltip: "Buy Dirt Upgrade 5.",
            image: "",
        },
        21: {
            name: "Clayify",
            done() { return player.c.points.gt(0) },
            tooltip: "Obtain clay.",
            image: "",
        },
        22: {
            name: "Slated",
            done() { return player.sl.points.gte(3) },
            tooltip: "Obtain 3 slate.",
            image: "",
        },
        23: {
            name: "Blackstone",
            done() { return player.co.points.gt(0) },
            tooltip: "Obtain coal. Reward: x1.25 Stone",
            image: "",
        },
        24: {
            name: "Slate^2",
            done() { return player.sl.points.gte(9) },
            tooltip: "Get 9 slate.",
            image: "",
        },
        31: {
            name: "Wasteland",
            done() { return hasUpgrade('co', 14) },
            tooltip: "Buy Polluted.",
            image: "",
        },
        32: {
            name: "Cooked",
            done() { return player.g.points.gt(0) },
            tooltip: "Obtain Glass.",
            image: "",
        },
        33: {
            name: "Sprouted",
            done() { return player.t.points.gt(0) },
            tooltip: "Reset for trees.",
            image: "",
        },
        34: {
            name: "Compressed Dirt",
            done() { return player.d.points.gte(100000) },
            tooltip: "Obtain 100,000 dirt.",
            image: "",
        },
        41: {
            name: "Glass Coating",
            done() { return player.g.points.gte(3) },
            tooltip: "Obtain 3 glass.",
            image: "",
        },
        42: {
            name: "Unpurity",
            done() { return player.i.points.gt(0) },
            tooltip: "Reset for iron. Reward: x1.25 Coal",
            image: "",
        },
        43: {
            name: "Choosing",
            done() { return hasChallenge('i', 12) },
            tooltip: "Unlock permanent choices.",
            image: "",
        },
        44: {
            name: "Billionaire",
            done() { return player.points.gte(1e9) },
            tooltip: "Obtain 1B grass.",
            image: "",
        },
    },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],
}, 
)
