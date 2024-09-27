document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [
            {
                title: 'Dr. Smith - Available',
                start: '2025-01-10',
                end: '2025-01-15'
            },
            {
                title: 'Dr. Johnson - Available',
                start: '2025-02-01',
                end: '2025-02-05'
            },
            {
                title: 'Dr. Lee - Available',
                start: '2025-03-20',
                end: '2025-03-25'
            }
        ],
        dateClick: function(info) {
            $('#patientModal').modal('show');
            document.getElementById('appointmentDate').value = info.dateStr;
        }
    });
    calendar.render();

    document.getElementById('patientForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var patientName = document.getElementById('patientName').value;
        var appointmentDate = document.getElementById('appointmentDate').value;
        var reason = document.getElementById('reason').value;

        calendar.addEvent({
            title: patientName + ' - ' + reason,
            start: appointmentDate
        });

        toastr.success('Appointment booked successfully!');
        $('#patientModal').modal('hide');
    });
});
// Redux setup
const { createStore } = Redux;

const initialState = {
  isChatbotOpen: false,
  messages: []
};

const chatbotReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_CHATBOT':
      return { ...state, isChatbotOpen: !state.isChatbotOpen };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

const store = createStore(chatbotReducer);

// Action creators
const toggleChatbot = () => ({ type: 'TOGGLE_CHATBOT' });
const addMessage = (message) => ({ type: 'ADD_MESSAGE', payload: message });

// Event listeners
document.getElementById('chatbotButton').addEventListener('click', () => {
  store.dispatch(toggleChatbot());
});

store.subscribe(() => {
  const state = store.getState();
  document.getElementById('chatbotPopup').style.display = state.isChatbotOpen ? 'block' : 'none';
});

document.getElementById('chatbotInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const message = e.target.value;
    store.dispatch(addMessage(message));
    e.target.value = '';
    const messagesDiv = document.getElementById('chatbotMessages');
    messagesDiv.innerHTML += `<p>${message}</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});