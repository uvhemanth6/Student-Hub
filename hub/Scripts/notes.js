// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Notes Logic
let notes = [];
let fileReferences = new Map();
let originalNotes = [];

window.onload = function() {
    const savedNotes = localStorage.getItem('communityNotes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
        originalNotes = [...notes];
        displayNotes();
    }
};

function uploadNote() {
    const title = document.getElementById('noteTitle').value;
    const description = document.getElementById('noteDescription').value;
    const fileInput = document.getElementById('noteFile');
    const file = fileInput.files[0];
    
    if (title && file) {
        const note = {
            id: Date.now(),
            title,
            description,
            fileName: file.name,
            uploader: "Current User",
            uploadDate: new Date().toLocaleDateString(),
            likes: 0,
            downloads: 0,
            comments: []
        };
        fileReferences.set(note.id, file);
        notes.push(note);
        originalNotes.push({ ...note });
        saveToLocalStorage();
        displayNotes();
        clearUploadForm();
    } else {
        alert("Please provide a title and select a file!");
    }
}

function displayNotes(filteredNotes = notes) {
    const feed = document.getElementById('notesFeed');
    feed.innerHTML = '';
    
    filteredNotes.forEach(note => {
        const noteCard = `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${note.title}</h5>
                        <p class="card-text">${note.description}</p>
                        <small class="text-muted">
                            Uploaded by ${note.uploader} on ${note.uploadDate}
                        </small>
                        <div class="mt-2">
                            <button class="btn btn-sm btn-outline-primary" onclick="likeNote(${note.id})">
                                <i class="far fa-thumbs-up"></i> ${note.likes}
                            </button>
                            <button class="btn btn-sm btn-outline-success" onclick="downloadNote(${note.id})">
                                <i class="fas fa-download"></i> ${note.downloads}
                            </button>
                            <button class="btn btn-sm btn-outline-secondary" onclick="shareNote(${note.id})">
                                <i class="fas fa-share"></i> Share
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteNote(${note.id})">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="input-group mb-2">
                            <input type="text" class="form-control" placeholder="Add a comment..." id="comment-${note.id}">
                            <button class="btn btn-primary" onclick="addComment(${note.id})">Post</button>
                        </div>
                        <div class="comments">
                            ${note.comments.map(comment => `<p class="mb-1">${comment}</p>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        feed.innerHTML += noteCard;
    });
}

function clearUploadForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteDescription').value = '';
    document.getElementById('noteFile').value = '';
}

function likeNote(id) {
    const note = notes.find(n => n.id === id);
    if (note) {
        note.likes++;
        saveToLocalStorage();
        displayNotes();
    }
}

function downloadNote(id) {
    const note = notes.find(n => n.id === id);
    const file = fileReferences.get(id);
    if (note && file) {
        try {
            note.downloads++;
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = note.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            saveToLocalStorage();
            displayNotes();
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Failed to download the file. Please try again.');
        }
    } else {
        alert('File not found. It may have been deleted or corrupted.');
    }
}

function shareNote(id) {
    const note = notes.find(n => n.id === id);
    if (note) {
        const shareUrl = `${window.location.origin}/notes.html?noteId=${id}`;
        if (navigator.share) {
            navigator.share({
                title: note.title,
                text: note.description,
                url: shareUrl
            }).catch(error => {
                console.error('Error sharing:', error);
                fallbackShare(shareUrl);
            });
        } else {
            fallbackShare(shareUrl);
        }
    } else {
        alert('Note not found. It may have been deleted.');
    }
}

function fallbackShare(shareUrl) {
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            alert('Share link copied to clipboard!');
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
            alert('Failed to copy link. Please try again.');
        });
}

function addComment(id) {
    const commentInput = document.getElementById(`comment-${id}`);
    const comment = commentInput.value.trim();
    if (comment) {
        const note = notes.find(n => n.id === id);
        if (note) {
            note.comments.push(comment);
            commentInput.value = '';
            saveToLocalStorage();
            displayNotes();
        }
    }
}

function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes = notes.filter(n => n.id !== id);
        originalNotes = originalNotes.filter(n => n.id !== id);
        fileReferences.delete(id);
        saveToLocalStorage();
        displayNotes();
    }
}

document.getElementById('searchNotes').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredNotes = originalNotes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.description.toLowerCase().includes(searchTerm)
    );
    displayNotes(filteredNotes);
});

document.getElementById('sortNotes').addEventListener('change', function(e) {
    const sortBy = e.target.value;
    let sortedNotes = [...notes];
    if (sortBy === 'likes') {
        sortedNotes.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'downloads') {
        sortedNotes.sort((a, b) => b.downloads - a.downloads);
    } else {
        sortedNotes.sort((a, b) => b.id - a.id);
    }
    displayNotes(sortedNotes);
});

function saveToLocalStorage() {
    localStorage.setItem('communityNotes', JSON.stringify(notes));
}