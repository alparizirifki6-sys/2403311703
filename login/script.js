const authSystem = (() => {
  const USERNAME_ADMIN = "admin";
  const REPORT_KEY = "izinkan fungsi laporan dijalankan";

  const outputResult = (message, isError = false) => {
    if (typeof document !== "undefined") {
      const resultElement = document.getElementById("result");
      if (resultElement) {
        if (isError) {
          resultElement.innerHTML = `<span style="color: red; font-weight: bold;">❌ ${message}</span>`;
        } else {
          resultElement.innerHTML = `
                        <span style="color: green; font-weight: bold;">✅ LOGIN SUKSES!</span><br>
                        **Key Tergenerate:** ${REPORT_KEY}<br>
                        ${message}
                    `;
        }
      }
    }

    if (isError) {
      console.error(message);
    } else {
      console.log(message);
    }
  };

  const validateUsernameCallback = (username, callback) => {
    console.log(
      "--- 1. Proses Callback: Validasi Username dimulai (Simulasi 500ms) ---"
    );
    setTimeout(() => {
      if (username === USERNAME_ADMIN) {
        callback(null, true);
      } else {
        callback(new Error("Username tidak dikenal atau salah."), false);
      }
    }, 500);
  };

  const generateKeyPromise = (isValid) => {
    return new Promise((resolve, reject) => {
      if (isValid) {
        console.log(
          "--- 2. Proses Promise: Generate Key dimulai (Simulasi 800ms) ---"
        );
        setTimeout(() => {
          resolve(REPORT_KEY);
        }, 800);
      } else {
        reject(new Error("Validasi gagal, Key tidak dapat dibuat."));
      }
    });
  };

  const runAdminReport = (key) => {
    if (key === REPORT_KEY) {
      console.log("--- 3. Proses Modul System: Jalankan Laporan ---");
      const successMessage = "Pesan berhasil dari admin.";

      outputResult(successMessage, false);
      return true;
    } else {
      const errorMessage = "Akses ditolak: Key tidak valid.";
      outputResult(errorMessage, true);
      return false;
    }
  };

  const startLoginProcess = (username) => {
    validateUsernameCallback(username, (error, isValid) => {
      if (error) {
        outputResult(`Login GAGAL: ${error.message}`, true);
        return;
      }

      if (isValid) {
        console.log("Callback SUKSES: Username valid.");

        generateKeyPromise(isValid)
          .then((accessKey) => {
            console.log("Promise SUKSES: Key berhasil digenerate.");

            runAdminReport(accessKey);
          })
          .catch((promiseError) => {
            outputResult(`Promise GAGAL: ${promiseError.message}`, true);
          });
      } else {
        outputResult("Login GAGAL: Username tidak valid.", true);
      }
    });
  };

  return {
    startLoginProcess,
  };
})();

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const usernameInput = document.getElementById("username").value;
      document.getElementById("result").textContent = "Memproses login...";
      authSystem.startLoginProcess(usernameInput);
    });
  });
} else if (typeof module !== "undefined" && module.exports) {
  const usernameToTest = "admin";
  console.log(
    `\n### Memulai Otentikasi Terminal Node.js untuk: "${usernameToTest}" ###`
  );
  authSystem.startLoginProcess(usernameToTest);
}
