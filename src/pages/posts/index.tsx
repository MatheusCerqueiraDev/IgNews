import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import styles from './style.module.scss';

type Post = {
    excerpt: string;
    slug: string;
    title: string;
    updatedAt: string;
}

interface PostProps{
    posts: Post[];

}

export default function Posts({posts}: PostProps){
    return(
        <>
        <Head>
            <title>Posts | Out of context BRasa</title>
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                {posts.map(post => (
                    <Link key={post.slug} href={`/posts/${post.slug}`}>
                        <a>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    </Link>
                )) }
            </div>
        </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'pubs')
    ], {
        fetch: ['pubs.title', 'pubs.content', 'pubs.content_relation_ship'],
        pageSize: 100,
    }
    )

    const posts = response.results.map(pubs => {
        return{
            slug: pubs.uid,
            title: RichText.asText(pubs.data.title),
            excerpt: pubs.data.content.find( content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(pubs.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return{
        props: {
            posts
        }
    }
}