function game() {
  let body = document.querySelector("body");
  let spaceship = document.querySelector(".spaceship");
  let music = document.getElementById("music");

  let dead = false;
  let played = false;

  window.onmouseenter = function () {
    if (!played) {
      console.log("sadsadas");
      document.getElementById("music").play();
      played = true;
    }
  };

  spaceship.style.visibility = "visible";

  body.style.backgroundPositionY = "0px";
  spaceship.style.left = "50%";

  let Y = 0;

  setInterval(() => {
    Y =
      Number(
        body.style.backgroundPositionY
          .split("")
          .filter((e) => "0123456789".split("").includes(e))
          .join("")
      ) + (spaceship.style.visibility === "visible" ? 10 : 0);
    body.style.backgroundPositionY = Y + "px";
  }, 15);

  let enemies = [];

  setInterval(() => {
    let rockets = document.querySelectorAll(".rocket");
    let E = document.querySelectorAll(".enemy");
    for (let R of rockets) {
      for (let e of E) {
        // let destroy = false;
        let y1 = Number(
          e.style.bottom
            .split("")
            .filter((e) => "-0123456789".split("").includes(e))
            .join("")
        );
        let y2 = Number(
          R.style.bottom
            .split("")
            .filter((e) => "-0123456789".split("").includes(e))
            .join("")
        );
        let x1 = Number(
          e.style.left
            .split("")
            .filter((e) => "-0123456789".split("").includes(e))
            .join("")
        );
        let x2 = Number(
          R.style.left
            .split("")
            .filter((e) => "-0123456789".split("").includes(e))
            .join("")
        );
        let n = Math.abs(x1 - x2) <= 4 && Math.abs(y1 - y2) == 0;
        if (n && e.style.visibility !== "hidden") {
          // destroy = true;
          let destroy = document.createElement("audio");
          destroy.src = "sounds/destroy.mp3";
          destroy.play();
          console.log("Sdadas");
          e.style.visibility = "hidden";
          body.removeChild(R);
          clearInterval(rocketMoving[R.getAttribute("i")]);
        }
      }
    }
  });

  setInterval(() => {
    let m = [];
    let r = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%"];
    while (m.length < 6) {
      for (let i = 0; i < 5; i++) {
        if (m.length >= 6) {
          break;
        }
        let d = Math.round(Math.random() * r.length - 1);
        if (!m.includes(d)) {
          m.push(d);
          const enemy = document.createElement("div");
          enemy.className = "enemy";
          enemy.style.left = r[d];
          enemy.setAttribute("i", enemies.length);
          enemy.style.bottom = "90vh";
          body.appendChild(enemy);
          enemies.push(
            setInterval(() => {
              let E = Number(
                enemy.style.bottom
                  .split("")
                  .filter((e) => "-0123456789".split("").includes(e))
                  .join("")
              );
              if (E < -10) {
                body.removeChild(enemy);
                clearInterval(enemies[enemy.getAttribute("i")]);
              } else {
                E -= spaceship.style.visibility === "visible" ? 1 : 0;
                enemy.style.bottom = E + "vh";
                let y1 = Number(
                  enemy.style.bottom
                    .split("")
                    .filter((e) => "-0123456789".split("").includes(e))
                    .join("")
                );
                let y2 = Number(
                  spaceship.style.bottom
                    .split("")
                    .filter((e) => "-0123456789".split("").includes(e))
                    .join("")
                );
                let x1 = Number(
                  enemy.style.left
                    .split("")
                    .filter((e) => "-0123456789".split("").includes(e))
                    .join("")
                );
                let x2 = Number(
                  spaceship.style.left
                    .split("")
                    .filter((e) => "-0123456789".split("").includes(e))
                    .join("")
                );
                let n = Math.abs(x1 - x2) <= 5 && Math.abs(y1 - y2) == 0;
                if (n && enemy.style.visibility !== "hidden") {
                  spaceship.style.visibility = "hidden";
                  music.pause();
                  if (!dead) {
                    dead = true;
                    let death = document.createElement("audio");
                    death.src = "sounds/death.mp3";
                    death.play();
                    setTimeout(() => {
                      location.reload();
                    }, 2500);
                  }
                }
              }
            }, 30)
          );
        }
      }
    }
  }, 1500);

  let move;
  let X = 0;
  let R = 0;
  let moving = false;
  let rocketShooted = false;
  let rocketMoving = [];

  window.addEventListener("keydown", (e) => {
    // moving the spaceship
    if (!moving) {
      move = setInterval(() => {
        if (e.key === "ArrowRight") {
          if (!played) {
            document.getElementById("music").play();
            played = true;
          }
          moving = true;
          X = Number(
            spaceship.style.left
              .split("")
              .filter((e) => "0123456789".split("").includes(e))
              .join("")
          );
          if (X < 85) {
            X++;
          }
          spaceship.style.left = X + "%";
        } else if (e.key === "ArrowLeft") {
          if (!played) {
            document.getElementById("music").play();
            played = true;
          }
          moving = true;
          X = Number(
            spaceship.style.left
              .split("")
              .filter((e) => "0123456789".split("").includes(e))
              .join("")
          );
          if (X > 10) {
            X--;
          }
          spaceship.style.left = X + "%";
        }
      }, 18);
    }

    //shooting rocket
    if (!rocketShooted) {
      rocketShooted = true;
      setTimeout(() => {
        rocketShooted = false;
      }, 200);

      if (e.code === "Space") {
        let shoot = document.createElement("audio");
        shoot.src = "sounds/shot.wav";
        shoot.play();
        let rocket = document.createElement("div");
        rocket.className = "rocket";
        rocket.style.left = spaceship.style.left;
        rocket.setAttribute("i", rocketMoving.length);
        rocket.style.bottom = "13vh";
        body.appendChild(rocket);
        rocketMoving.push(
          setInterval(() => {
            R = Number(
              rocket.style.bottom
                .split("")
                .filter((e) => "0123456789".split("").includes(e))
                .join("")
            );
            R += spaceship.style.visibility === "visible" ? 1 : 0;
            rocket.style.bottom = R + "vh";
            if (R > 110) {
              clearInterval(rocketMoving[rocket.getAttribute("i")]);
              body.removeChild(rocket);
            }
          }, 30)
        );
      }
    }
  });

  window.addEventListener("keyup", (e) => {
    clearInterval(move);
    moving = false;
  });
}

game();
