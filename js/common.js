class WeddingPage {
  constructor() {
    this.header = document.querySelector(".header");
    this.lastScrollY = window.scrollY;

    this.initializeHeader();
    this.initializeGallery();

    this.initializeTopButton();
    this.initializeVolumeControl();
    this.initializeCopyFunctionality();
    this.initializeListOpen();
    this.initializeMap();
    this.initializeSh();
  }

  initializeHeader() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.header.classList.add("visible");
      } else {
        this.header.classList.remove("visible");
      }
      this.lastScrollY = window.scrollY;
    });
  }

  initializeGallery() {
    const swiper = new Swiper(".mySwiper", {
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
    });

    const galleryImages = document.querySelectorAll(".gallery-image");
    const modalOverlay = document.querySelector(".modal-overlay");
    const closeModal = document.querySelector(".close-btn");

    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        swiper.slideTo(index);
        modalOverlay.style.display = "flex";
      });
    });

    closeModal.addEventListener("click", () => {
      modalOverlay.style.display = "none";
    });
  }

  initializeMap() {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      "서울특별시 영등포구 국회대로76길 16",
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          });
          map.setCenter(coords);
        }
      }
    );
  }
  initializeSh() {
    Kakao.init("0f774301663c4292c86c39ef1a23b00f");
    const sButton = document.getElementById("kakao-link-btn");

    sButton.addEventListener("click", () => {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "준수 ♡ 예나 결혼합니다.",
          description: "2025년 1월 18일 토요일 오전 11시",
          imageUrl: "https://kofhoom.github.io/kimjunsu/image/main_img_1.jpg",
          imageWidth: 1440,
          imageHeight: 720,
          link: {
            mobileWebUrl: "https://kofhoom.github.io/kimjunsu/",
            webUrl: "https://kofhoom.github.io/kimjunsu/",
          },
        },
        // buttons: [
        //   {
        //     title: "준수 ♡ 예나 결혼합니다.",
        //     link: {
        //       mobileWebUrl: "https://kofhoom.github.io/kimjunsu/",
        //       webUrl: "https://kofhoom.github.io/kimjunsu/",
        //     },
        //   },
        // ],
      });
    });
  }
  initializeTopButton() {
    const topButton = document.getElementById("top-btn");
    window.addEventListener("scroll", () => {
      topButton.style.display = window.scrollY > 200 ? "flex" : "none";
    });

    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  initializeVolumeControl() {
    const volumeButton = document.getElementById("volume-btn");
    const audio = new Audio("./ZionTV.mp3");
    audio.loop = true;

    let isMuted = false;
    volumeButton.addEventListener("click", () => {
      if (isMuted) {
        audio.play();
        volumeButton.textContent = "🔊";
      } else {
        audio.pause();
        volumeButton.textContent = "🔈";
      }
      isMuted = !isMuted;
    });

    audio.play().catch(() => console.log("Autoplay blocked"));
  }

  initializeCopyFunctionality() {
    const copyButtons = document.querySelectorAll(".s_btn.copy");
    copyButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const accountNumberElement = button
          .closest("li")
          .querySelector(".acc_num");
        const accountNumber = accountNumberElement.textContent.trim();

        // 클립보드에 계좌번호 복사
        navigator.clipboard
          .writeText(accountNumber)
          .then(() => alert(`계좌번호 ${accountNumber}가 복사되었습니다.`))
          .catch((err) => alert(`복사 실패: ${err}`));
      });
    });
  }

  initializeListOpen() {
    const accountBox = document.querySelectorAll(".account_box");
    accountBox.forEach((box) => {
      box.addEventListener("click", function () {
        const accountList = this.nextElementSibling;
        event.target.children[0].classList.toggle("active");

        accountList.style.display =
          accountList.style.display === "none" ||
          accountList.style.display === ""
            ? "block"
            : "none";
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new WeddingPage();
});
