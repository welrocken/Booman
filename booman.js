function getCurrentTabInformation(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];

    var url = tab.url;
    var title = tab.title;

    callback(url, title);
  });
}

function createBookmarkTree(bookmarkDetails, current, parentId) {
  current = typeof current === "undefined" ? 
    bookmarkDetails.directories[0] :
    current;

  parentId = typeof parentId === "undefined" ? "1" : parentId;

  if (current === null && typeof parentId !== "undefined") {
    bookmark = {
      "title": bookmarkDetails.name,
      "url": bookmarkDetails.url,
      "parentId": parentId
    };
      
    chrome.bookmarks.create(bookmark);
    return;
  }

  chrome.bookmarks.search(current.name, function(results) {
    var i, exists, bookmark;

    exists = false;
    for (i = 0; i < results.length; i++) {
      if (!results[i].hasOwnProperty("url") && 
         (typeof parentId !== "undefined" && results[i].parentId === parentId)) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      bookmark = {
        "title": current.name,
      };

      if (typeof parentId !== "undefined") {
        bookmark.parentId = parentId;
      }
  
      chrome.bookmarks.create(bookmark, function(result) {
          createBookmarkTree(bookmarkDetails, current.next, result.id);
        });
    }
  });
}

function bookmarkDirectory(name, next, previous) {
  return {
    "name": name,
    "next": next,
    "previous": previous
  };
}

function bookmarkDetails(url, name, directories) {
  return  {
    "url": url,
    "directories": directories,
    "name": name
  };
}

function getBookmarkDetails(url, title) {
  var parser, name, directories,
      hostNames, paths, i, 
      bookmarkDirectories;

  directories = [];

  parser = document.createElement('a');
  parser.href = url;

  name = title;

  hostNames = getExtensionlessHostname(parser.hostname);
  if (hostNames.length >= 1) {
    directories.push(hostNames[hostNames.length - 1].toUpperCamelCase());

    for (i = 0; i < hostNames.length - 1; i++) {
      directories.push(hostNames[i].toUpperCamelCase());
    }
  }

  paths = parser.pathname.split2("/");
  for (i = 0; i < paths.length; i++) {
    directories.push(paths[i].toUpperCamelCase());
  }

  // TODO: Query support for paths, if done smart.

  bookmarkDirectories = [];
  for (i = 0; i < directories.length; i++) {
    bookmarkDirectories.push(bookmarkDirectory(directories[i], null, null));
  }

  for (i = 0; i < bookmarkDirectories.length; i++) {
    if (i > 0) {
      bookmarkDirectories[i].previous = bookmarkDirectories[i - 1];
    }
    if (i < directories.length - 1) {
      bookmarkDirectories[i].next = bookmarkDirectories[i + 1];
    }
  }

  console.log(bookmarkDirectories);
  return bookmarkDetails(url, name, bookmarkDirectories);
}

function addBookmark(url, title) {
  createBookmarkTree(getBookmarkDetails(url, title));
}

chrome.browserAction.onClicked.addListener(function(tab) {
  getCurrentTabInformation(function(url, title){
    addBookmark(url, title);
  });
});