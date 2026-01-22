import { useState, useEffect } from "react";
import api from "@/lib/axios";

export interface Article {
  id_publication: string;
  titre: string;
  type: string;
  description: string;
  img: string;
  statut: string;
  publication_date: string;
  created_at: string;
  updated_at: string;
}

export const useArticleById = (id_publication: string | null) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (id_publication === null) {
    return { article: null, loading: false, error: "ID de publication invalide." };
  }
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/publications/id/${id_publication}`);
                setArticle(response.data.publication);
            } catch (err) {
                setError("Erreur lors du chargement de l'article.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id_publication]);

    return { article, loading, error };
};

export const useCreateArticle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createArticle = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await api.post('/publications/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      
      if (response.data.success) {
        setSuccess(true);
        console.log('Article créé:', response.data);
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la création de l\'article');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createArticle, error, success };
};

export const useAllArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const response = await api.get('/publications/all');
                setArticles(response.data.publications || []);
            } catch (err) {
                setError("Erreur lors du chargement des articles.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);
    
    return { articles, loading, error };
}

export const useAdminAllArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await api.get('/publications/admin/all');
                setArticles(response.data.publications || []);
            } catch (err) {
                setError("Erreur lors du chargement des articles.");
            } finally {
                setLoading(false);
            }
        };
        
        useEffect(() => {
        fetchArticles();
    }, []);

    return { articles, loading, error, refresh: fetchArticles };
}   

export const useDeleteArticle = (id_publication: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const deleteArticle = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await api.delete(`/publications/delete/${id_publication}`);
            if (response.data.success) {
                setSuccess(true);
                console.log('Article supprimé:', response.data);
            } else {
                setError(response.data.message);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors de la suppression de l\'article');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return { loading, deleteArticle, error, success };
};