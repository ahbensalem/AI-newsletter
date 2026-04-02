import { useSearchParams } from "react-router-dom";

export function useArticleModal(articles) {
  const [searchParams, setSearchParams] = useSearchParams();
  const articleId = searchParams.get("article");
  const selectedArticle = articles.find(a => a.id === articleId) || null;

  function openArticle(id) {
    setSearchParams({ article: id });
  }

  function closeArticle() {
    searchParams.delete("article");
    setSearchParams(searchParams);
  }

  return { selectedArticle, openArticle, closeArticle };
}
