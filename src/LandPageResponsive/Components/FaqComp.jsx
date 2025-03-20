import { useState } from 'react';
import  './Styles/FaqComp.css'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const FaqComp = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqs = [
      {
        question: "What is the purpose of this App?",
        answer:
          "This app is designed to revolutionize the relationship between investors and entrepreneurs. It provides a platform for networking, sharing educational content, and exploring job opportunities in the investment and entrepreneurial space.",
      },
      {
        question: "How this app can help me get a Job?",
        answer:
          "The app features a dedicated job section where users can explore job listings specifically related to the fields of investment and entrepreneurship, helping you connect with companies and opportunities that match your skills and interests.",
      },
      {
        question: "Can I find Investors In this App?",
        answer:
          "Yes, the app is designed to help entrepreneurs connect with potential investors. By engaging with educational content, sharing insights, and networking, you can discover investors interested in supporting innovative ideas.",
      },
      {
        question: "Can I promote my Startup in this App?",
        answer:
          "Yes, this app is completely free to use! We believe in making valuable content and connections accessible to everyone.",
      },
      {
        question: "Is this App free to use?",
        answer:
          "Users can post only informational and educational content. Videos should focus on topics related to investment, entrepreneurship, and business growth to benefit the community.",
      },
      {
        question: "What kind of Videos I can Post?",
        answer:
          "You can post videos focusing on investment, entrepreneurship, and business growth to benefit the community.",
      },
      {
        question: "Can I share my videos on other platforms?",
        answer:
          "Yes, you are free to share your videos on other platforms! Our goal is to help you spread valuable insights and connect with a broader audience.",
      },
    ];
    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div>      <div className="faqs mx-auto" id="faq">
            <section className="faq-sect ">
                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div key={index} className="-faq-item py-1">
                            <div
                                className={`faq-question ${activeIndex === index ? "active" : ""
                                    }`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <p className='my-3'>{faq.question}</p>
                                <span className="faq-toggle-icon">
                                    {activeIndex === index ? (
                                        <IoIosArrowUp className="faq-icon" />
                                    ) : (
                                        <IoIosArrowDown className="faq-icon" />
                                    )}
                                </span>
                            </div>
                            {activeIndex === index && (
                                <div className="faq-answer">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
        </div>
    )
}

export default FaqComp