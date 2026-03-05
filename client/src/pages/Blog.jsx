import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment'
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const Blog = () => {

    const { id } = useParams()
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);

    const [name, setName] = useState('');
    const [content, setContent] = useState('');


    const fetchBlogData = () => {
        const blog = blog_data.find(item => item._id === id);
        setData(blog)
    }

    const fetchComments = () => {
        setComments(comments_data)
    }

    const addComment = async (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, [id])

    return data ? (
        <div className='relative'>

            {/* Background */}
            <img
                src={assets.gradientBackground}
                alt=""
                className='absolute top-0 left-0 w-full -z-10 opacity-60'
            />

            <Navbar />

            {/* Blog Header */}
            <div className='text-center mt-16 px-4 text-gray-600'>
                <p className='text-primary py-4 font-medium text-sm sm:text-base'>
                    Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
                </p>

                <h1 className='text-2xl sm:text-4xl lg:text-5xl font-semibold max-w-3xl mx-auto text-gray-800'>
                    {data.title}
                </h1>

                <h3 className='text-sm sm:text-base my-5 max-w-2xl mx-auto text-gray-500'>
                    {data.subTitle}
                </h3>

                <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
                    Jan Ibrahim
                </p>
            </div>

            {/* Blog Content */}
            <div className='px-4 sm:px-6 lg:px-0 max-w-5xl mx-auto my-10'>

                <img
                    src={data.image}
                    alt=""
                    className='rounded-2xl mb-10 w-full max-h-[500px] object-cover'
                />

                <div
                    className='prose max-w-3xl mx-auto'
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />

                {/* Comments Section */}
                <div className='mt-15 max-w-3xl mx-auto'>
                    <p className='font-semibold mb-6'>
                        Comments ({comments.length})
                    </p>

                    <div className='flex flex-col gap-4'>
                        {comments.map((item, index) => (
                            <div
                                key={index}
                                className='bg-primary/5 border border-primary/10 p-4 rounded-xl text-gray-700'
                            >
                                <div className='flex items-center gap-3 mb-2'>
                                    <img
                                        src={assets.user_icon}
                                        alt=""
                                        className='w-8 h-8 rounded-full'
                                    />
                                    <p className='font-medium'>{item.name}</p>
                                </div>

                                <p className='text-sm ml-11 mb-2'>
                                    {item.content}
                                </p>

                                <p className='text-xs text-gray-400 ml-11'>
                                    {Moment(item.createdAt).fromNow()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Comment */}
                <div className='max-w-3xl mx-auto px-4 mt-16'>
                    <p className='font-semibold mb-4 text-lg'>Add your Comment</p>

                    <form
                        onSubmit={addComment}
                        className='flex flex-col items-start gap-4 max-w-lg'
                    >
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder='Name'
                            required
                            className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/40'
                        />

                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder='Comment'
                            required
                            className='w-full p-3 border border-gray-300 rounded-lg outline-none h-40 focus:ring-2 focus:ring-primary/40'
                        />

                        <button
                            type='submit'
                            className='bg-primary text-white rounded-lg py-2 px-8 hover:scale-105 transition-transform duration-200 cursor-pointer'
                        >
                            Submit
                        </button>
                    </form>
                </div>


                {/* Social Media icons */}
                <div className='my-24 max-w-3xl mx-auto px-4'>
                    <p className='font-semibold mb-6 text-center text-lg'>
                        Share this Blog on Social Media!
                    </p>

                    <div className='flex justify-center gap-6'>
                        <img src={assets.facebook_icon} alt="Facebook" className='w-10 sm:w-12 cursor-pointer hover:scale-110 transition' />
                        <img src={assets.twitter_icon} alt="Twitter" className='w-10 sm:w-12 cursor-pointer hover:scale-110 transition' />
                        <img src={assets.googleplus_icon} alt="Google" className='w-10 sm:w-12 cursor-pointer hover:scale-110 transition' />
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    ) : (
        <Loader />
    )
}

export default Blog