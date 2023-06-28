

(() => {

    //dom

    let rakbuku = [];
    function addnewBook(addnewBook) {
        addnewBook.preventDefault();
        const searchfromTitle = document.querySelector("#inputBookTitle"), withAuthor = document.querySelector("#inputBookAuthor"),
            withYear = document.querySelector("#inputBookYear"), readedbook = document.querySelector("#inputBookIsComplete"),
            newBookAdded = {
                id: +new Date,
                title: searchfromTitle.value,
                author: withAuthor.value,
                year: withYear.value,
                isComplete: readedbook.checked
            };


        console.log(newBookAdded),
            rakbuku.push(newBookAdded),
            document.dispatchEvent(new Event("bookChanged"))
    }

    function searchfromTitle(addnewBook) {
        addnewBook.preventDefault();
        const searchfromTitle = document.querySelector("#searchBookTitle");
        query = searchfromTitle.value,
            query ? newBookAdded(rakbuku.filter((function (rakbuku) {
                return rakbuku.title.toLowerCase().includes(query.toLowerCase())
            }
            ))) : newBookAdded(rakbuku)
    }

    function withAuthor(addnewBook) {
        const searchfromTitle = Number(addnewBook.target.id), withAuthor = rakbuku.findIndex((function (rakbuku) {
            return rakbuku.id === searchfromTitle
        }
        ));
        -1 !== withAuthor && (rakbuku[withAuthor] = {
            ...rakbuku[withAuthor],
            isComplete: !0
        },
            document.dispatchEvent(new Event("bookChanged")))
    }

    function withYear(addnewBook) {
        const searchfromTitle = Number(addnewBook.target.id), withAuthor = rakbuku.findIndex((function (rakbuku) {
            return rakbuku.id === searchfromTitle
        }
        ));
        -1 !== withAuthor && (rakbuku[withAuthor] = {
            ...rakbuku[withAuthor],
            isComplete: !1
        },
            document.dispatchEvent(new Event("bookChanged")))
    }

    function readedbook(addnewBook) {
        const searchfromTitle = Number(addnewBook.target.id),
            withAuthor = rakbuku.findIndex((function (rakbuku) {
                return rakbuku.id === searchfromTitle
            }));
        -1 !== withAuthor && (rakbuku.splice(withAuthor, 1),
            document.dispatchEvent(new Event("bookChanged")))
    }

    function changeText() {
        const newstatusbook = document.getElementById("inputBookIsComplete");
        if (newstatusbook.checked) {
            let status = document.getElementById("status");
            status.innerText = "Selesai Dibaca";
        } else {
            let status = document.getElementById("status");
            status.innerText = "Belum Selesai Dibaca";
        }
    }
    document.getElementById("inputBookIsComplete").addEventListener('change', changeText);

    function newBookAdded(rakbuku) {
        const addnewBook = document.querySelector("#incompleteBookshelfList")
            , searchfromTitle = document.querySelector("#completeBookshelfList");
        addnewBook.innerHTML = "",
            searchfromTitle.innerHTML = "";
        for (const newBookAdded of rakbuku) {
            const rakbuku = document.createElement("article");
            rakbuku.classList.add("book_item");
            const newtitle = document.createElement("h2");
            newtitle.innerText = newBookAdded.title;
            const newauthor = document.createElement("p");
            newauthor.innerText = "Penulis: " + newBookAdded.author;
            const yearofbook = document.createElement("p");

            if (yearofbook.innerText = "Tahun: " + newBookAdded.year,
                rakbuku.appendChild(newtitle),
                rakbuku.appendChild(newauthor),
                rakbuku.appendChild(yearofbook),
                newBookAdded.isComplete) {
                const addnewBook = document.createElement("div");
                addnewBook.classList.add("action");
                const withAuthor = document.createElement("button");
                withAuthor.id = newBookAdded.id,
                    withAuthor.innerText = "Belum Selesai dibaca",
                    withAuthor.classList.add("green"),
                    withAuthor.addEventListener("click", withYear);
                const newtitle = document.createElement("button");
                newtitle.id = newBookAdded.id,
                    newtitle.innerText = "Hapus buku",
                    newtitle.classList.add("red"),
                    newtitle.addEventListener("click", readedbook),

                    addnewBook.appendChild(withAuthor),
                    addnewBook.appendChild(newtitle),
                    rakbuku.appendChild(addnewBook),
                    searchfromTitle.appendChild(rakbuku)

            } else {

                const searchfromTitle = document.createElement("div");
                searchfromTitle.classList.add("action");

                const withYear = document.createElement("button");
                withYear.id = newBookAdded.id,
                    withYear.innerText = "Selesai dibaca",
                    withYear.classList.add("green"),
                    withYear.addEventListener("click", withAuthor);
                const newtitle = document.createElement("button");
                newtitle.id = newBookAdded.id,
                    newtitle.innerText = "Hapus buku",
                    newtitle.classList.add("red"),
                    newtitle.addEventListener("click", readedbook),
                    searchfromTitle.appendChild(withYear),
                    searchfromTitle.appendChild(newtitle),
                    rakbuku.appendChild(searchfromTitle),
                    addnewBook.appendChild(rakbuku)
            }
        }
    }

    // data 

    function newtitle() {
        !function (rakbuku) {
            localStorage.setItem("books", JSON.stringify(rakbuku))
        }(rakbuku),
            newBookAdded(rakbuku)
    }
    window.addEventListener("load", (function () {
        rakbuku = JSON.parse(localStorage.getItem("books")) || [],
            newBookAdded(rakbuku);
        const withAuthor = document.querySelector("#inputBook"), withYear = document.querySelector("#searchBook");
        withAuthor.addEventListener("submit", addnewBook), withYear.addEventListener("submit", searchfromTitle), document.addEventListener("bookChanged", newtitle)
    }
    ))


}
)();
