
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-red-600">من نحن</h1>
            <p className="mt-4 text-xl text-gray-600">قصة متجر الماسة للتقنية</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-8">
            <p>
              مرحباً بكم في <strong>متجر الماسة للتقنية</strong>، وجهتكم الموثوقة لكل ما يتعلق بعالم التكنولوجيا في قلب مدينة السويس. نحن لسنا مجرد متجر، بل نحن شغوفون بالتقنية ونسعى لمشاركة هذا الشغف معكم.
            </p>
            <p>
              تأسس متجرنا على مبدأ توفير أحدث وأفضل المنتجات التقنية من أجهزة كمبيوتر، لابتوبات، ومكونات هاردوير بأسعار تنافسية، مع تقديم خدمة عملاء استثنائية. نؤمن بأن التكنولوجيا يجب أن تكون في متناول الجميع، ولهذا السبب نحرص على تقديم حلول تناسب كل الاحتياجات والميزانيات.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <div className="bg-gray-50 p-6 rounded-lg border-r-4 border-red-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">رؤيتنا</h3>
                  <p>أن نكون الخيار الأول لعشاق التقنية في السويس والمناطق المحيطة، من خلال توفير تجربة تسوق فريدة تجمع بين الجودة، التنوع، والخبرة.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-r-4 border-red-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">مهمتنا</h3>
                  <p>تقديم منتجات عالية الجودة، وخدمات استشارية وتقنية متميزة، بالإضافة إلى حلول تسويق رقمي مبتكرة لمساعدة عملائنا على تحقيق النجاح.</p>
              </div>
            </div>

            <p>
              فريقنا مكون من خبراء ومتحمسين للتقنية، مستعدون دائماً لتقديم المساعدة والمشورة، سواء كنت تقوم ببناء أول جهاز كمبيوتر خاص بك، أو تبحث عن ترقية لجهازك الحالي، أو تحتاج إلى دعم لتنمية أعمالك عبر الإنترنت.
            </p>
            <p>
              نشكركم على ثقتكم في متجر الماسة للتقنية، ونتطلع لخدمتكم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
