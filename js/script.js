// On page load
document.addEventListener('DOMContentLoaded', function() {

    // 1. Create a pop-up notification modal
    createNotificationModal();

    // 2. Set up the notification button's function
    setupNotificationButton();

    // 3. Set up the trash can button functions on tasks
    setupTaskDeleteButtons();

    // 4. Add interactive effects to the cards
    addCardHoverEffects();

    // 5. Add click effects to interactive elements
    addClickEffects();
});

// Function to create a pop-up notification modal
function createNotificationModal() {
    // Create the main element for the modal
    const modal = document.createElement('div');
    modal.id = 'notificationModal';
    modal.className = 'notification-modal';
    modal.style.display = 'none';

    // Modal content
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Notifications</h3>
                <button class="close-btn" onclick="closeNotificationModal()">&times;</button>
            </div>
            <div class="notifications-list">
                <div class="notification-item">
                    <i class="fa-solid fa-bell"></i>
                    <div class="notification-content">
                        <h4>New Project</h4>
                        <p>A new project, "E-commerce Store App", has been added</p>
                        <span class="time">5 minutes ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <i class="fa-solid fa-user-plus"></i>
                    <div class="notification-content">
                        <h4>New Member</h4>
                        <p>Ahmed Mohamed has joined the team</p>
                        <span class="time">An hour ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <i class="fa-solid fa-check-circle"></i>
                    <div class="notification-content">
                        <h4>Task Completed</h4>
                        <p>Article writing has been completed</p>
                        <span class="time">2 hours ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <i class="fa-solid fa-dollar-sign"></i>
                    <div class="notification-content">
                        <h4>New Payment</h4>
                        <p>A new payment of $1500 has been received</p>
                        <span class="time">3 hours ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <i class="fa-solid fa-exclamation-triangle"></i>
                    <div class="notification-content">
                        <h4>Update Required</h4>
                        <p>The system requires a security update</p>
                        <span class="time">A day ago</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add the modal to the page
    document.body.appendChild(modal);
}

// Function to set up the notification button
function setupNotificationButton() {
    const notificationBtn = document.querySelector('.notification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openNotificationModal();
        });
    }
}

// Function to open the notification modal
function openNotificationModal() {
    const modal = document.getElementById('notificationModal');
    modal.style.display = 'flex';

    // Fade-in effect
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Close modal when clicking the overlay
    const overlay = modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', closeNotificationModal);
}

// Function to close the notification modal
function closeNotificationModal() {
    const modal = document.getElementById('notificationModal');
    modal.classList.remove('show');

    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Function to set up task delete buttons
function setupTaskDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.tasks .delete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const taskRow = this.closest('.task-row');

            // Transition effect
            taskRow.style.transition = 'all 0.5s ease';

            // Add "deleted" class instead of actual deletion
            if (taskRow.classList.contains('deleted')) {
                // Restore task to its normal state
                taskRow.classList.remove('deleted');
                taskRow.style.opacity = '1';
                taskRow.style.transform = 'translateX(0)';
            } else {
                // Mark the task as deleted
                taskRow.classList.add('deleted');
                taskRow.style.opacity = '0.3';
                taskRow.style.transform = 'translateX(5px)';
            }
        });
    });
}

// Function to add card effects
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.wrapper > div, .projects');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Function to add click effects
function addClickEffects() {
    // Click effect for buttons
    const buttons = document.querySelectorAll('input[type="submit"], .visit, .save');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            // Remove the effect after it's done
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Click effect for sidebar elements
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove the active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add the active class to the clicked link
            this.classList.add('active');
        });
    });
}

// Function to add loading effects
function addLoadingEffects() {
    // Page loading effect
    const widgets = document.querySelectorAll('.wrapper > div');

    widgets.forEach((widget, index) => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(20px)';

        setTimeout(() => {
            widget.style.transition = 'all 0.5s ease';
            widget.style.opacity = '1';
            widget.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Trigger loading effects on page load
window.addEventListener('load', addLoadingEffects);

// Function to add table scroll effect
function addTableScrollEffect() {
    const table = document.querySelector('.responsive-table');
    if (table) {
        table.addEventListener('scroll', function() {
            const scrollLeft = this.scrollLeft;
            const maxScroll = this.scrollWidth - this.clientWidth;

            if (scrollLeft > 0) {
                this.classList.add('scrolled');
            } else {
                this.classList.remove('scrolled');
            }
        });
    }
}