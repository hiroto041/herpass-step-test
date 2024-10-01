let currentQuestion = 1;
let isTransitioning = false; // フェードイン・フェードアウト中に複数回イベントが発生するのを防ぐ

// 各質問の回答を保存するためのオブジェクト
let formData = {
    desire: '',       // 質問1: 転職意欲
    salary: '',       // 質問2: 現在の年収
    job: [],          // 質問3: 職種の選択
    experience: '',   // 質問4: 経理・財務の実務経験
    timing: '',       // 質問5: 転職希望時期
    age: '',          // 質問6: 年齢
    name: '',         // 質問7: 氏名
    phone: '',        // 質問8: 電話番号
    email: '',        // 質問9: メールアドレス
};

// selectOption関数を使って質問1~5の回答を保存
function selectOption(questionNumber, value) {
    if (isTransitioning) return; // トランジション中は次の質問に進まない
    // 質問1~5の回答を保存
    switch (questionNumber) {
        case 1:
            formData.desire = value;  // 転職意欲
            break;
        case 2:
            formData.salary = value;  // 年収
            break;
        case 3:
            formData.job = value;     // 職種
            break;
        case 4:
            formData.experience = value;  // 経理・財務の実務経験
            break;
        case 5:
            formData.timing = value;  // 転職希望時期
            break;
        default:
            break;
    }
    nextQuestion();  // 次の質問に進む
}

// 選択した職種をトグル（選択/解除）する関数
function toggleSelection(value) {
    const index = formData.job.indexOf(value);

    // 選択済みの場合は解除
    if (index > -1) {
        formData.job.splice(index, 1);
    } else {
        // 未選択の場合は追加
        formData.job.push(value);
    }

    // 選択されたボタンにスタイルを適用
    const buttons = document.querySelectorAll('#question3 .option-button');
    buttons.forEach(button => {
        if (formData.job.includes(button.textContent)) {
            button.classList.add('selected'); // 選択中のスタイル
        } else {
            button.classList.remove('selected'); // 選択解除
        }
    });
}

function nextQuestion() {
    if (isTransitioning) return; // トランジション中は次の質問に進まない
    isTransitioning = true; // トランジション開始

    // currentQuestionが1~5の場合: 選択チェック
    if (currentQuestion >= 1 && currentQuestion <= 5) {
        if (!formData.desire && currentQuestion === 1) {
            alert('選択してください');  // 質問1で選択されていない場合
            isTransitioning = false;
            return;
        }
        if (!formData.salary && currentQuestion === 2) {
            alert('選択してください');  // 質問2で選択されていない場合
            isTransitioning = false;
            return;
        }
        if (!formData.job && currentQuestion === 3) {
            alert('選択してください');  // 質問3で選択されていない場合
            isTransitioning = false;
            return;
        }
        if (!formData.experience && currentQuestion === 4) {
            alert('選択してください');  // 質問4で選択されていない場合
            isTransitioning = false;
            return;
        }
        if (!formData.timing && currentQuestion === 5) {
            alert('選択してください');  // 質問5で選択されていない場合
            isTransitioning = false;
            return;
        }
    }

    // currentQuestionが6~9の場合: 入力チェック
    if (currentQuestion >= 6 && currentQuestion <= 9) {
        const inputElement = document.querySelector(`#question${currentQuestion} input`);
        if (!inputElement.value) {
            alert('記入してください');  // 入力されていない場合
            isTransitioning = false;
            return;
        }
    }

    // currentQuestionが9を超えていないか確認
    if (currentQuestion < 9) {
        const currentElement = document.getElementById(`question${currentQuestion}`);
        const navButtons = document.querySelector('.navigation-buttons');
        const headerElement = document.querySelector('header'); // ヘッダー要素の取得

        // 現在の質問とナビゲーションボタンが存在するか確認
        if (currentElement && navButtons && headerElement) {
            currentElement.style.transition = "opacity 0.5s";
            currentElement.style.opacity = 0;
            navButtons.style.transition = "opacity 0.5s";
            navButtons.style.opacity = 0;

            // フェードアウト完了後に質問を切り替える
            setTimeout(() => {
                currentElement.classList.remove('active');
                navButtons.classList.remove('active');
                currentQuestion++;

                const nextElement = document.getElementById(`question${currentQuestion}`);

                // 次の質問が存在するか確認
                if (nextElement && navButtons) {
                    nextElement.classList.add('active');
                    navButtons.classList.add('active');
                    headerElement.style.display = 'block'; // ヘッダーが消えないようにする

                    // 0.1秒遅らせてフェードイン
                    setTimeout(() => {
                        nextElement.style.transition = "opacity 0.5s";
                        nextElement.style.opacity = 1;
                        navButtons.style.transition = "opacity 0.5s";
                        navButtons.style.opacity = 1;
                        isTransitioning = false; // トランジション終了
                    }, 100); // 切り替え後少し遅らせてフェードイン
                }

                updateNavigationButtons();
                updateProgress();
                moveProgressMarker(); // アイコンを次のステップに移動
            }, 500); // フェードアウトが完了するまで500ms待つ
        }
    } else {
        isTransitioning = false; // トランジション終了
    }
}





function prevQuestion() {
    if (isTransitioning) return; // トランジション中は前の質問に戻らない
    isTransitioning = true; // トランジション開始

    if (currentQuestion > 1) {
        const currentElement = document.getElementById(`question${currentQuestion}`);
        const navButtons = document.querySelector('.navigation-buttons');

        // 現在の質問とナビゲーションボタンが存在するか確認
        if (currentElement && navButtons) {
            currentElement.style.transition = "opacity 0.5s";
            currentElement.style.opacity = 0;
            navButtons.style.transition = "opacity 0.5s";
            navButtons.style.opacity = 0;

            // フェードアウト完了後に質問を切り替える
            setTimeout(() => {
                currentElement.classList.remove('active');
                navButtons.classList.remove('active');
                currentQuestion--;

                const prevElement = document.getElementById(`question${currentQuestion}`);

                // 前の質問が存在するか確認
                if (prevElement && navButtons) {
                    prevElement.classList.add('active');
                    navButtons.classList.add('active');

                    // 0.1秒遅らせてフェードイン
                    setTimeout(() => {
                        prevElement.style.transition = "opacity 0.5s";
                        prevElement.style.opacity = 1;
                        navButtons.style.transition = "opacity 0.5s";
                        navButtons.style.opacity = 1;
                        isTransitioning = false; // トランジション終了
                    }, 100); // 切り替え後少し遅らせてフェードイン
                }

                updateNavigationButtons();
                updateProgress();
                moveProgressMarker(); // アイコンを前のステップに移動
            }, 500); // フェードアウトが完了するまで500ms待つ
        }
    } else {
        isTransitioning = false; // トランジション終了
    }
}

function updateProgress() {
    const steps = document.querySelectorAll(".progress-step");
    steps.forEach((step, index) => {
        if (index < currentQuestion) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });
}

function moveProgressMarker() {
    const marker = document.querySelector('.progress-marker');
    const stepWidth = document.querySelector('.progress-step').offsetWidth + 30; // ステップ間の幅を計算
    const newLeft = (currentQuestion - 1) * stepWidth; // 新しい位置を計算
    marker.style.left = `${newLeft}px`; // アイコンの位置を更新
}

function submitForm() {
    // 質問6~9の回答を取得
    formData.age = document.querySelector('#question6 input').value;
    formData.name = document.querySelector('#question7 input').value;
    formData.phone = document.querySelector('#question8 input').value;
    formData.email = document.querySelector('#question9 input').value;

    // 入力されたデータをコンソールに表示
    console.log("Form Data:", formData);

    // 簡易的なデータチェック
    if (!formData.age || !formData.name || !formData.phone || !formData.email) {
        alert('すべての項目を正しく入力してください');
    } else {
        alert("フォームが送信されました");

        // フォーム送信後に指定のURLにリダイレクト
        window.location.href = "https://lp.her-pass.jp/thanks-google-2";
    }
}


function updateNavigationButtons() {
    const nextButton = document.getElementById("nextButton");
    const submitButton = document.getElementById("submitButton");
    const prevButton = document.querySelector(".navigation-button:first-child");

    // 初期状態: 最初の質問では戻るボタンを非表示、次の質問へは表示
    if (currentQuestion === 1) {
        prevButton.style.display = "none"; // 最初の質問では戻るボタンを非表示
        nextButton.style.display = "inline-block"; // 次の質問ボタンは表示
        submitButton.style.display = "none"; // 送信ボタンは非表示
    } else {
        prevButton.style.display = "inline-block"; // 戻るボタンを表示
        nextButton.style.display = "inline-block"; // 次の質問ボタンを表示
        submitButton.style.display = "none"; // 送信ボタンは非表示
    }

    // 最後の質問では「次の質問へ」を非表示、「送信」ボタンを表示
    if (currentQuestion === 9) {
        nextButton.style.display = "none";  // 次の質問ボタンを非表示
        submitButton.style.display = "inline-block";  // 送信ボタンを表示
    }
}


// 質問6~9: blurイベントで次の質問へ進む
document.querySelector('#question6 input').addEventListener('blur', () => nextQuestion());
document.querySelector('#question7 input').addEventListener('blur', () => nextQuestion());
document.querySelector('#question8 input').addEventListener('blur', () => nextQuestion());
document.querySelector('#question9 input').addEventListener('blur', () => submitForm());

// Enterキーで次の質問へ進む処理も残す
document.querySelectorAll('.input-field').forEach((input) => {
    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            nextQuestion();
        }
    });
});

// ページロード時の初期設定
document.addEventListener("DOMContentLoaded", () => {
    updateNavigationButtons(); // 初回ロード時にナビゲーションボタンを適切に設定
    const firstQuestion = document.getElementById(`question${currentQuestion}`);
    
    // 初回ロード時に最初の質問が存在するか確認
    if (firstQuestion) {
        firstQuestion.classList.add('active');
        document.querySelector('.navigation-buttons').classList.add('active');
        setTimeout(() => {
            firstQuestion.style.opacity = 1;
            document.querySelector('.navigation-buttons').style.opacity = 1;
        }, 50);
    }
});
