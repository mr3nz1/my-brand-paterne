import { loadPage } from "../backend/script";
const currentPage = localStorage.getItem("currentPage");
let articles;
function deleteArticle(articleId) {
    const closeModal = document.querySelector(".close-modal");
    const modal = document.querySelector(".modal");
    const title = document.createElement("h2");
    const message = document.createElement("p");
    const deleteBtn = document.createElement("button");
    title.textContent = "Delete";
    message.textContent = "Want to delete article with id: " + articleId;
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("button");
    modal.children[0].appendChild(title);
    modal.children[0].appendChild(message);
    modal.children[0].append(deleteBtn);
    modal.classList.add("modal-open");
    deleteBtn.addEventListener("click", () => {
        articles = JSON.parse(localStorage.getItem("articles"));
        let newArticles = articles.filter((article) => article.id !== articleId);
        localStorage.setItem("articles", JSON.stringify(newArticles));
        modal.children[0].removeChild(title);
        modal.children[0].removeChild(message);
        modal.children[0].removeChild(deleteBtn);
        const event = new Event("deletedArticle");
        return dispatchEvent(event);
    });
    closeModal.addEventListener("click", () => {
        modal.children[0].removeChild(title);
        modal.children[0].removeChild(message);
        modal.children[0].removeChild(deleteBtn);
        modal.classList.remove("modal-open");
    });
}
function loadArticles() {
    articles = JSON.parse(localStorage.getItem("articles"));
    const publishedArticles = articles.filter((article) => article.published === true);
    const unPublishedArticles = articles.filter((article) => article.published !== true);
    const publishedArticlesContainer = document.getElementById("published_articles_container");
    const unPublishedArticlesContainer = document.getElementById("unpublished_articles_container");
    let publishedArticlesContent = "";
    let unPublishedArticlesContent = "";
    publishedArticles.forEach((article) => {
        publishedArticlesContent += `
    <div class="article_container">
    <div class="article_info_container">
          <h3 class=""><a class="underline_on_hover" href="./article.html">${article.title}</a>
          </h3>
          <p>
              ${article.description}
          </p>
          <div class="article_meta_data">
              <p>${article.created_at}</p>
              <span class="dot_separator"></span>
              <p>14 min read</p>
              <span class="dot_separator"></span>
              <div class="likes_description">
                  <img src="../assets/icons/heart.png" alt="" />
                  <p>83 likes</p>
              </div>
              <span class="dot_separator"></span>
              <span class="underline_on_hover article_update_btn" id="${article.id}">Update</span>
              <span class="dot_separator"></span>
              <span class="underline_on_hover article_delete_btn" id="${article.id}">Delete</span>
          </div>
      </div>
      <img class="article_img" src="${article.image}" alt="" />
      </div>`;
    });
    unPublishedArticles.forEach((article) => {
        unPublishedArticlesContent += `
    <div class="article_container">
    <div class="article_info_container">
          <h3 class=""><a class="underline_on_hover" href="./article.html">${article.title}</a>
          </h3>
          <p>
              ${article.description}
          </p>
          <div class="article_meta_data">
              <p>Jan 2, 2024</p>
              <span class="dot_separator"></span>
              <p>14 min read</p>
              <span class="dot_separator"></span>
              <div class="likes_description">
                  <img src="../assets/icons/heart.png" alt="" />
                  <p>83 likes</p>
              </div>
              <span class="dot_separator"></span>
              <span class="underline_on_hover article_update_btn" id="${article.id}">Update</span>
              <span class="dot_separator"></span>
              <span class="underline_on_hover article_delete_btn" id="${article.id}">Delete</span>
          </div>
      </div>
      <img class="article_img" src="${article.image}" alt="" />
      </div>`;
    });
    publishedArticlesContainer.innerHTML = publishedArticlesContent;
    unPublishedArticlesContainer.innerHTML = unPublishedArticlesContent;
}
function configureDeleteAndUpdateBtns() {
    // window.addEventListener("loadedPage", () => {
    const deleteBtns = document.querySelectorAll(".article_delete_btn");
    const updateBtns = document.querySelectorAll(".article_update_btn");
    // const articles = JSON.parse(localStorage.getItem("articles"));
    // listen to delete btns
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", () => {
            const articleId = deleteBtn.getAttribute("id");
            deleteArticle(articleId);
        });
    });
    // listen to update btns
    updateBtns.forEach((updateBtn) => {
        updateBtn.addEventListener("click", () => {
            const articleId = updateBtn.getAttribute("id");
            loadPage({ page: "update_article", articleId });
        });
    });
}
window.addEventListener("blogLoaded", () => {
    loadArticles();
    configureDeleteAndUpdateBtns();
});
window.addEventListener("deletedArticle", () => {
    loadArticles();
    configureDeleteAndUpdateBtns();
});
export { deleteArticle };
