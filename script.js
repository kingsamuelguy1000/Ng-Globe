// --- Dashboard Page Specific Logic ---
const moreButton = document.getElementById('moreButton');
const hiddenProducts = document.getElementById('hiddenProducts');

if (moreButton) {
    moreButton.addEventListener('click', function() {
        if (hiddenProducts) {
            if (hiddenProducts.style.display === 'none') {
                hiddenProducts.style.display = 'grid';
                moreButton.textContent = 'Less..';
            } else {
                hiddenProducts.style.display = 'none';
                moreButton.textContent = 'More..';
            }
        }
    });
}

// --- Buy Data Page Specific Logic ---
const dataNetworkRadios = document.querySelectorAll('input[name="dataNetwork"]');
const dataPlanSelect = document.getElementById('dataPlan');
const buyDataForm = document.getElementById('buyDataForm');

const dummyDataPlans = {
    'MTN': [
        { value: 'mtn_1gb_30d', text: '1GB for ₦250 (30 days)', data_mb: 1024 },
        { value: 'mtn_2gb_30d', text: '2GB for ₦500 (30 days)', data_mb: 2048 }
    ],
    'Airtel': [
        { value: 'airtel_500mb_7d', text: '500MB for ₦150 (7 days)', data_mb: 500 },
        { value: 'airtel_1_5gb_30d', text: '1.5GB for ₦450 (30 days)', data_mb: 1536 }
    ],
    'Glo': [
        { value: 'glo_1gb_14d', text: '1GB for ₦200 (14 days)', data_mb: 1024 },
        { value: 'glo_3gb_30d', text: '3GB for ₦700 (30 days)', data_mb: 3072 }
    ]
};

function populateDataPlans(network) {
    if (dataPlanSelect) {
        const plans = dummyDataPlans[network] || [];
        dataPlanSelect.innerHTML = '<option value="">-- Select Plan --</option>';
        plans.forEach(plan => {
            const option = document.createElement('option');
            option.value = plan.value;
            option.textContent = plan.text;
            option.dataset.mb = plan.data_mb;
            dataPlanSelect.appendChild(option);
        });
    }
}

if (dataNetworkRadios) {
    dataNetworkRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            populateDataPlans(this.value);
        });
    });
}

if (buyDataForm) {
    buyDataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedNetworkRadio = document.querySelector('input[name="dataNetwork"]:checked');
        if (!selectedNetworkRadio) { alert("Please select a network."); return; }
        const network = selectedNetworkRadio.value;
        const dataPlanText = dataPlanSelect.options[dataPlanSelect.selectedIndex].textContent;
        const phoneNumber = document.getElementById('dataPhoneNumber').value;
        alert(`Confirming Data purchase:\nNetwork: ${network}\nPlan: ${dataPlanText}\nPhone: ${phoneNumber}\n\n(This is a dummy confirmation.)`);
    });
}


// --- Buy Airtime Page Specific Logic ---
const airtimeNetworkRadios = document.querySelectorAll('input[name="airtimeNetwork"]');
const airtimeAmountSelect = document.getElementById('airtimeAmount');
const buyAirtimeForm = document.getElementById('buyAirtimeForm');

const dummyAirtimeAmounts = {
    'MTN': [{ value: '50', text: '₦50' }, { value: '100', text: '₦100' }, { value: '200', text: '₦200' }],
    'Airtel': [{ value: '50', text: '₦50' }, { value: '100', text: '₦100' }, { value: '200', text: '₦200' }],
    'Glo': [{ value: '50', text: '₦50' }, { value: '100', text: '₦100' }, { value: '200', text: '₦200' }]
};

if (airtimeNetworkRadios) {
    airtimeNetworkRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const selectedNetwork = this.value;
            const amounts = dummyAirtimeAmounts[selectedNetwork] || [];
            if (airtimeAmountSelect) {
                airtimeAmountSelect.innerHTML = '<option value="">-- Select Amount --</option>';
                amounts.forEach(amount => {
                    const option = document.createElement('option');
                    option.value = amount.value;
                    option.textContent = amount.text;
                    airtimeAmountSelect.appendChild(option);
                });
            }
        });
    });
}

if (buyAirtimeForm) {
    buyAirtimeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedNetworkRadio = document.querySelector('input[name="airtimeNetwork"]:checked');
        if (!selectedNetworkRadio) { alert("Please select a network."); return; }
        const network = selectedNetworkRadio.value;
        const amount = airtimeAmountSelect.options[airtimeAmountSelect.selectedIndex].text;
        const phoneNumber = document.getElementById('airtimePhoneNumber').value;
        alert(`Confirming Airtime purchase:\nNetwork: ${network}\nAmount: ${amount}\nPhone: ${phoneNumber}\n\n(This is a dummy confirmation.)`);
    });
}


// --- Fund Wallet Page Specific Logic ---
const fundWalletForm = document.getElementById('fundWalletForm');
const fundAmountInput = document.getElementById('fundAmount');

if (fundWalletForm) {
    fundWalletForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const amount = fundAmountInput.value;
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

        if (!selectedPaymentMethod) { alert("Please choose a payment method."); return; }
        const paymentMethod = selectedPaymentMethod.value;

        alert(`Confirming Wallet Funding:\nAmount: ₦${amount}\nMethod: ${paymentMethod}\n\n(Dummy payment processing.)`);
    });
}

// --- Withdraw Money Page Specific Logic ---
const withdrawForm = document.getElementById('withdrawForm');
const transferTypeRadios = document.querySelectorAll('input[name="transferType"]');
const ngGlobeTransferFields = document.getElementById('ngGlobeTransferFields');
const bankTransferFields = document.getElementById('bankTransferFields');
const accountNumberInput = document.getElementById('accountNumber');
const bankNameSelect = document.getElementById('bankName');
const accountNameDisplay = document.getElementById('accountNameDisplay');
const pinModal = document.getElementById('pinModal');
const pinInput = document.getElementById('pinInput');
const confirmPinButton = document.getElementById('confirmPinButton');
const cancelPinButton = document.getElementById('cancelPinButton');

var currentWithdrawalDetails = null;

if (transferTypeRadios) {
    transferTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Bank') {
                if (bankTransferFields) bankTransferFields.style.display = 'block';
                if (ngGlobeTransferFields) ngGlobeTransferFields.style.display = 'none';
                if (accountNumberInput) accountNumberInput.setAttribute('required', 'required');
                if (bankNameSelect) bankNameSelect.setAttribute('required', 'required');
                if (document.getElementById('ngGlobeUserId')) {
                    document.getElementById('ngGlobeUserId').removeAttribute('required');
                }
            } else if (this.value === 'NgGlobe') {
                if (bankTransferFields) bankTransferFields.style.display = 'none';
                if (ngGlobeTransferFields) ngGlobeTransferFields.style.display = 'block';
                if (document.getElementById('ngGlobeUserId')) {
                    document.getElementById('ngGlobeUserId').setAttribute('required', 'required');
                }
                if (accountNumberInput) accountNumberInput.removeAttribute('required');
                if (bankNameSelect) bankNameSelect.removeAttribute('required');
            }
        });
    });
}

if (accountNumberInput) {
    accountNumberInput.addEventListener('input', function() {
        const acctNum = this.value;
        if (accountNameDisplay) {
            if (acctNum.length === 10 && !isNaN(acctNum)) {
                accountNameDisplay.textContent = 'Dummy Account Name Detected';
            } else {
                accountNameDisplay.textContent = 'Auto-detects account name';
            }
        }
    });
}

if (withdrawForm) {
    withdrawForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedTransferType = document.querySelector('input[name="transferType"]:checked');
        if (!selectedTransferType) { alert("Please choose a transfer type."); return; }
        const transferType = selectedTransferType.value;
        const withdrawAmount = document.getElementById('withdrawAmount').value;
        currentWithdrawalDetails = {
            transferType: transferType,
            amount: withdrawAmount
        };
        if (transferType === 'Bank') {
            const accountNumber = accountNumberInput.value;
            const bankName = bankNameSelect.options[bankNameSelect.selectedIndex].text;
            const accountName = accountNameDisplay.textContent;
            currentWithdrawalDetails.accountNumber = accountNumber;
            currentWithdrawalDetails.bankName = bankName;
            currentWithdrawalDetails.accountName = accountName;
        } else if (transferType === 'NgGlobe') {
            const ngGlobeUserId = document.getElementById('ngGlobeUserId').value;
            currentWithdrawalDetails.ngGlobeUserId = ngGlobeUserId;
        }
        if (pinInput && pinModal) {
            pinInput.value = '';
            pinModal.style.display = 'flex';
        }
    });
}

if (confirmPinButton) {
    confirmPinButton.addEventListener('click', function() {
        const pin = pinInput.value;
        if (pin.length === 4) {
            var finalConfirmation = `Withdrawal confirmed!\nAmount: ₦${currentWithdrawalDetails.amount}`;
            if (currentWithdrawalDetails.transferType === 'Bank') {
                finalConfirmation += `\nTo Bank: ${currentWithdrawalDetails.accountName} (${currentWithdrawalDetails.accountNumber} - ${currentWithdrawalDetails.bankName})`;
            } else if (currentWithdrawalDetails.transferType === 'NgGlobe') {
                finalConfirmation += `\nTo Ng-Globe User: ${currentWithdrawalDetails.ngGlobeUserId}`;
            }
            finalConfirmation += `\nPIN entered: ${pin}\n\n(Dummy transaction processed!)`;
            alert(finalConfirmation);
            if (pinModal) pinModal.style.display = 'none';
            window.location.href = 'dashboard.html';
        } else {
            alert("Please enter a 4-digit PIN.");
        }
    });
}

if (cancelPinButton) {
    cancelPinButton.addEventListener('click', function() {
        if (pinModal) pinModal.style.display = 'none';
        if (pinInput) pinInput.value = '';
    });
}

// Check for URL parameter to auto-select transfer type on page load
if (window.location.pathname.endsWith('withdraw-money.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const transferType = urlParams.get('transferType');
    if (transferType === 'bank') {
        const bankRadio = document.getElementById('transferTypeBank');
        if (bankRadio) {
            bankRadio.checked = true;
            // Manually trigger the change event to show/hide fields
            const event = new Event('change');
            bankRadio.dispatchEvent(event);
        }
    }
}


// --- Earn Data Page Specific Logic (Updated) ---
var earnedDataBalanceMB = parseInt(localStorage.getItem('earnedDataBalanceMB')) || 0;
var adsWatchedToday = parseInt(localStorage.getItem('adsWatchedToday')) || 0;
var lastAdWatchTime = parseInt(localStorage.getItem('lastAdWatchTime')) || 0;

const rewardTiers = [
    { ads: 1, mb: 50 },
    { ads: 3, mb: 100 },
    { ads: 8, mb: 150 },
    { ads: 14, mb: 300 },
    { ads: 22, mb: 500 },
    { ads: 30, mb: 1024 }
];

const clickToWatchButton = document.getElementById('clickToWatchButton');
const adsWatchedCountText = document.getElementById('adsWatchedCountText');
const rewardProgressBarFill = document.getElementById('rewardProgressBarFill');
const dataBalanceDisplay = document.getElementById('dataBalanceDisplay');
const adPlaybackOverlay = document.getElementById('adPlaybackOverlay');
const adCountdownDisplay = document.getElementById('adCountdownDisplay');
const withdrawDataButton = document.getElementById('withdrawDataButton');
const withdrawDataModal = document.getElementById('withdrawDataModal');
const withdrawDataPlanSelect = document.getElementById('withdrawDataPlanSelect');
const selectWithdrawDataPlanButton = document.getElementById('selectWithdrawDataPlanButton');
const closeWithdrawDataModalButton = document.getElementById('closeWithdrawDataModalButton');

const adDurationSeconds = 45; // Simulating a 45-second ad
const adCooldownSeconds = 60; // 1-minute cooldown

function updateEarnedDataUI() {
    if (adsWatchedCountText) {
        adsWatchedCountText.textContent = `Today Ads to watch (${adsWatchedToday}/30)`;
    }

    if (dataBalanceDisplay) {
        if (earnedDataBalanceMB >= 1024) {
            const gb = (earnedDataBalanceMB / 1024).toFixed(2);
            dataBalanceDisplay.textContent = `${gb} Gb`;
        } else {
            dataBalanceDisplay.textContent = `${earnedDataBalanceMB.toFixed(0)} Mb`;
        }
    }

    // Update progress bar
    if (rewardProgressBarFill) {
        const progressPercentage = (adsWatchedToday / 30) * 100;
        rewardProgressBarFill.style.width = `${progressPercentage}%`;
    }

    // Update reward points styling
    rewardTiers.forEach(tier => {
        const pointElement = document.querySelector(`.point-${tier.ads}`);
        if (pointElement) {
            if (adsWatchedToday >= tier.ads) {
                pointElement.classList.add('achieved');
            } else {
                pointElement.classList.remove('achieved');
            }
        }
    });
}

function startAdPlayback() {
    if (adPlaybackOverlay) {
        adPlaybackOverlay.style.display = 'flex';
    }
    
    // Animate the ad progress bar
    const adProgressBarFill = document.getElementById('adProgressBarFill');
    if (adProgressBarFill) {
        adProgressBarFill.style.width = '0%';
        setTimeout(() => {
            adProgressBarFill.style.transition = `width ${adDurationSeconds}s linear`;
            adProgressBarFill.style.width = '100%';
        }, 50);
    }
    
    let countdown = adDurationSeconds;
    const countdownInterval = setInterval(() => {
        if (adCountdownDisplay) {
            adCountdownDisplay.textContent = countdown;
        }
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            adPlaybackOverlay.style.display = 'none';
            processAdReward();
        }
    }, 1000);
}

function processAdReward() {
    adsWatchedToday++;
    localStorage.setItem('adsWatchedToday', adsWatchedToday);
    localStorage.setItem('lastAdWatchTime', Date.now());

    const currentTier = rewardTiers.find(tier => adsWatchedToday === tier.ads);
    if (currentTier) {
        let earnedThisSession = 0;
        const previousTierIndex = rewardTiers.findIndex(tier => tier.ads === currentTier.ads) - 1;
        
        if (previousTierIndex >= 0) {
            const previousTotal = rewardTiers[previousTierIndex].mb;
            earnedThisSession = currentTier.mb - previousTotal;
        } else {
            earnedThisSession = currentTier.mb;
        }
        
        earnedDataBalanceMB += earnedThisSession;
        localStorage.setItem('earnedDataBalanceMB', earnedDataBalanceMB);
        alert(`Congratulations! You have reached a new reward tier and earned ${earnedThisSession}MB. Your total earned data is now ${earnedDataBalanceMB}MB.`);
    } else {
         alert(`Ad finished! You've watched ${adsWatchedToday} ads today.`);
    }

    startAdCooldown();
    updateEarnedDataUI();
}

function startAdCooldown() {
    clickToWatchButton.classList.add('disabled');
    let cooldownRemaining = adCooldownSeconds;
    const cooldownInterval = setInterval(() => {
        if (clickToWatchButton) {
            clickToWatchButton.textContent = `Watch in ${cooldownRemaining}s`;
        }
        cooldownRemaining--;
        if (cooldownRemaining < 0) {
            clearInterval(cooldownInterval);
            if (clickToWatchButton) {
                 clickToWatchButton.textContent = "Click to watch";
                 clickToWatchButton.classList.remove('disabled');
            }
        }
    }, 1000);
}

// Reset daily ad count if it's a new day
const lastVisitDate = localStorage.getItem('lastVisitDate');
const today = new Date().toDateString();
if (lastVisitDate !== today) {
    adsWatchedToday = 0;
    earnedDataBalanceMB = 0;
    localStorage.setItem('adsWatchedToday', 0);
    localStorage.setItem('earnedDataBalanceMB', 0);
    localStorage.setItem('lastVisitDate', today);
}

// Check cooldown on page load
const now = Date.now();
if (now - lastAdWatchTime < (adCooldownSeconds * 1000)) {
    startAdCooldown();
}

// Initial UI update
updateEarnedDataUI();

// Event Listeners
if (clickToWatchButton) {
    clickToWatchButton.addEventListener('click', function() {
        if (adsWatchedToday >= 30) {
            alert("You have reached the maximum number of ads you can watch today.");
            return;
        }
        if (!clickToWatchButton.classList.contains('disabled')) {
            startAdPlayback();
        }
    });
}

if (withdrawDataButton) {
    withdrawDataButton.addEventListener('click', function() {
        if (earnedDataBalanceMB < 500) {
            alert(`You need at least 500MB of earned data to withdraw a plan. You currently have ${earnedDataBalanceMB.toFixed(0)} MB.`);
            return;
        }
        if (withdrawDataModal) withdrawDataModal.style.display = 'flex';
    });
}

if (selectWithdrawDataPlanButton) {
    selectWithdrawDataPlanButton.addEventListener('click', function() {
        const selectedOption = withdrawDataPlanSelect.options[withdrawDataPlanSelect.selectedIndex];
        if (selectedOption.value === "") {
            alert("Please select a data plan to withdraw.");
            return;
        }
        const planText = selectedOption.textContent;
        const sizeMB = parseFloat(selectedOption.dataset.mb);
        const selectedNetwork = selectedOption.dataset.network;
        
        if (earnedDataBalanceMB < sizeMB) {
            alert(`You do not have enough earned data for this plan. You need ${sizeMB}MB but have ${earnedDataBalanceMB.toFixed(0)}MB.`);
            return;
        }
        
        earnedDataBalanceMB -= sizeMB;
        localStorage.setItem('earnedDataBalanceMB', earnedDataBalanceMB);
        updateEarnedDataUI();
        
        alert(`Successfully converted ${sizeMB}MB earned data into "${planText}"!`);
        if (withdrawDataModal) withdrawDataModal.style.display = 'none';
        window.location.href = `buy-data.html?network=${selectedNetwork}&planText=${encodeURIComponent(planText)}`;
    });
}

if (closeWithdrawDataModalButton) {
    closeWithdrawDataModalButton.addEventListener('click', function() {
        if (withdrawDataModal) withdrawDataModal.style.display = 'none';
    });
}


// --- Transactions Page Specific Logic ---
if (document.getElementById('transactionList')) {
    const dummyTransactions = [
        { type: 'debit', description: 'Data Purchase (MTN 2GB)', amount: 500, date: '2025-09-23' },
        { type: 'credit', description: 'Wallet Funded (Paystack)', amount: 2000, date: '2025-09-22' },
        { type: 'debit', description: 'NG Transfer to Jane Doe', amount: 500, date: '2025-09-22' },
        { type: 'credit', description: 'Earned Data (100 MB)', amount: 100, date: '2025-09-21' },
    ];

    const transactionList = document.getElementById('transactionList');
    const noTransactionsMessage = document.getElementById('noTransactionsMessage');

    if (dummyTransactions.length === 0) {
        noTransactionsMessage.style.display = 'block';
    } else {
        dummyTransactions.forEach(tx => {
            const listItem = document.createElement('l
