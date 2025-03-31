// ポケモンのデータ
const pokemonData = {
  ピカチュウ: {
    name: "ピカチュウ",
    hp: 100,
    energy: 0,
    attackPower: 20,
    specialAttackPower: 50,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    attacks: {
      normal: { name: "かみなり", power: 20 },
      special: { name: "10万ボルト", power: 50 }
    }
  },
  リザードン: {
    name: "リザードン",
    hp: 120,
    energy: 0,
    attackPower: 25,
    specialAttackPower: 60,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    attacks: {
      normal: { name: "かえんほうしゃ", power: 25 },
      special: { name: "はどうだん", power: 60 }
    }
  },
  フシギダネ: {
    name: "フシギダネ",
    hp: 90,
    energy: 0,
    attackPower: 22,
    specialAttackPower: 45,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    attacks: {
      normal: { name: "はっぱカッター", power: 22 },
      special: { name: "ソーラービーム", power: 45 }
    }
  },
  ゼニガメ: {
    name: "ゼニガメ",
    hp: 95,
    energy: 0,
    attackPower: 18,
    specialAttackPower: 40,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    attacks: {
      normal: { name: "みずでっぽう", power: 18 },
      special: { name: "ハイドロポンプ", power: 40 }
    }
  },
  イーブイ: {
    name: "イーブイ",
    hp: 85,
    energy: 0,
    attackPower: 25,
    specialAttackPower: 30,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
    attacks: {
      normal: { name: "たいあたり", power: 25 },
      special: { name: "シャドーボール", power: 30 }
    }
  }
};

// 現在のプレイヤーと敵の情報
let player = {};
let enemy = {};
let isPlayerTurn = true;

// ポケモン選択時の処理
function choosePokemon(pokemonName) {
  player = { ...pokemonData[pokemonName], energy: 0 };
  enemy = pokemonData.リザードン; // 敵ポケモンはリザードン
  document.getElementById("select-screen").style.display = "none";
  document.getElementById("battle-screen").style.display = "flex";

  // ポケモンの画像と情報を表示
  document.getElementById("player-img").src = player.img;
  document.getElementById("player-name").innerText = player.name;
  document.getElementById("player-hp").innerText = `HP: ${player.hp}`;
  document.getElementById("enemy-img").src = enemy.img;
  document.getElementById("enemy-name").innerText = enemy.name;
  document.getElementById("enemy-hp").innerText = `HP: ${enemy.hp}`;
}

// 攻撃方法を選択する
function chooseAttack() {
  if (!isPlayerTurn) return;
  document.getElementById("attack-options").style.display = "block";
}

// 攻撃処理
function attack(type) {
  let damage = 0;
  let attackName = "";

  if (type === "normal") {
    damage = player.attacks.normal.power;
    attackName = player.attacks.normal.name;
  } else if (type === "special" && player.energy >= 5) {
    damage = player.attacks.special.power;
    attackName = player.attacks.special.name;
    player.energy -= 5; // 特殊技はエネルギーを消費
  } else {
    document.getElementById("message").innerText = "エネルギーが足りません！";
    return;
  }

  enemy.hp -= damage; // 敵のHPを減らす
  document.getElementById("enemy-hp").innerText = `HP: ${enemy.hp}`;
  document.getElementById("message").innerText = `${player.name}は${attackName}で${damage}ダメージを与えた！`;

  // 敵のターン
  setTimeout(() => {
    enemyAttack();
  }, 1000);
  
  // プレイヤーのターン終了後にエネルギーを回復
  player.energy += 1;
  document.getElementById("player-energy").innerText = `エネルギー: ${player.energy}`;
  
  document.getElementById("attack-options").style.display = "none";
  isPlayerTurn = false;
}

// 敵の攻撃処理
function enemyAttack() {
  if (enemy.hp <= 0) {
    document.getElementById("message").innerText = `${enemy.name}は倒れた！あなたの勝ち！`;
    return;
  }

  let damage = enemy.attacks.normal.power;
  let attackName = enemy.attacks.normal.name;
  player.hp -= damage; // プレイヤーのHPを減らす
  document.getElementById("player-hp").innerText = `HP: ${player.hp}`;

  document.getElementById("message").innerText = `${enemy.name}は${attackName}で${damage}ダメージを与えた！`;

  if (player.hp <= 0) {
    document.getElementById("message").innerText = `${player.name}は倒れた！あなたの負け！`;
    return;
  }

  isPlayerTurn = true;
}
