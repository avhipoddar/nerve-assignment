const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];

const strategyArray = [
    {
        'View': 'Bullish',
        'Value': {
            '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Bull Call Spread'],
            '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
            '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
        }
    },
    {
        'View': 'Bearish',
        'Value': {
            '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread'],
            '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
            '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
        }
    },
    {
        'View': 'RangeBound',
        'Value': {
            '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Short Straddle'],
            '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
            '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
        }
    },
    {
        'View': 'Volatile',
        'Value': {
            '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
            '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
            '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
        }
    }
];

const viewButtons = document.querySelectorAll('.view-button');
const dateSelect = document.getElementById('date-select');
const cardsContainer = document.querySelector('.cards-container');

let selectedView = 'Bullish';
let selectedDate = dateArray[0];

viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedView = button.getAttribute('data-view');
        renderCards();
    });
});

dateArray.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = date;
    dateSelect.appendChild(option);
});

dateSelect.addEventListener('change', () => {
    selectedDate = dateSelect.value;
    renderCards();
});

function renderCards() {
    cardsContainer.innerHTML = '';
    const selectedViewObject = strategyArray.find(item => item.View === selectedView);
    const strategies = selectedViewObject.Value[selectedDate] || [];
    
    if (strategies.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = `There are no strategies for ${selectedDate}`;
        cardsContainer.appendChild(emptyState);
    } else {
        const strategyCountMap = {};
        strategies.forEach(strategy => {
            if (strategyCountMap[strategy]) {
                strategyCountMap[strategy]++;
            } else {
                strategyCountMap[strategy] = 1;
            }
        });

        Object.keys(strategyCountMap).forEach(strategy => {
            const card = document.createElement('div');
            card.className = 'card';

            const strategyName = document.createElement('div');
            strategyName.className = 'strategy-name';
            strategyName.textContent = strategy;

            const strategyCount = document.createElement('div');
            strategyCount.className = 'strategy-count';
            strategyCount.textContent = `${strategyCountMap[strategy]} ${strategyCountMap[strategy] > 1 ? 'Strategies' : 'Strategy'}`;

            card.appendChild(strategyName);
            card.appendChild(strategyCount);
            cardsContainer.appendChild(card);
        });
    }
}

renderCards();
