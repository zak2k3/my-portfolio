import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        skills: 'Skills',
        blog: 'Blog',
        contact: 'Contact',
      },
      hero: {
        greeting: "Hi, I'm",
        name: 'Zakariya Baaziz',
        roles: ['Full Stack Developer', 'React Specialist', 'Laravel Expert', 'Problem Solver', 'Trading Tools Builder'],
        cta: 'View My Work',
        ctaSecondary: 'Download CV',
        location: 'Tangier, Morocco',
        available: 'Available for hire',
      },
      about: {
        title: 'About Me',
        subtitle: 'The Developer Behind the Code',
        bio: 'Full-stack developer based in Tangier specializing in React and Laravel. Passionate about building tools that solve real problems, especially in trading and data analysis. Currently finishing my final year while building production-ready web applications.',
        languages: 'Languages',
        education: 'Education',
        experience: 'Experience',
        downloadCV: 'Download CV',
      },
      projects: {
        title: 'Projects',
        subtitle: 'What I\'ve Built',
        viewCode: 'View Code',
        liveDemo: 'Live Demo',
        technologies: 'Technologies',
      },
      skills: {
        title: 'Skills',
        subtitle: 'My Technical Arsenal',
      },
      blog: {
        title: 'Blog',
        subtitle: 'Thoughts & Insights',
        readMore: 'Read More',
        minRead: 'min read',
      },
      contact: {
        title: 'Contact',
        subtitle: 'Let\'s Work Together',
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send Message',
        success: 'Message sent successfully!',
        location: 'Location',
        phone: 'Phone',
        emailLabel: 'Email',
      },
      footer: {
        rights: 'All rights reserved.',
        madeWith: 'Made with',
        and: 'and',
      },
    },
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        about: 'À propos',
        projects: 'Projets',
        skills: 'Compétences',
        blog: 'Blog',
        contact: 'Contact',
      },
      hero: {
        greeting: 'Bonjour, je suis',
        name: 'Zakariya Baaziz',
        roles: ['Développeur Full Stack', 'Spécialiste React', 'Expert Laravel', 'Résolveur de Problèmes'],
        cta: 'Voir Mon Travail',
        ctaSecondary: 'Télécharger CV',
        location: 'Tanger, Maroc',
        available: 'Disponible',
      },
      about: {
        title: 'À Propos',
        subtitle: 'Le Développeur Derrière le Code',
        bio: 'Développeur full-stack basé à Tanger, spécialisé en React et Laravel. Passionné par la création d\'outils qui résolvent de vrais problèmes, notamment dans le trading et l\'analyse de données.',
        languages: 'Langues',
        downloadCV: 'Télécharger CV',
      },
      projects: {
        title: 'Projets',
        subtitle: 'Ce Que J\'ai Construit',
        viewCode: 'Voir le Code',
        liveDemo: 'Démo Live',
        technologies: 'Technologies',
      },
      skills: {
        title: 'Compétences',
        subtitle: 'Mon Arsenal Technique',
      },
      blog: {
        title: 'Blog',
        subtitle: 'Pensées & Insights',
        readMore: 'Lire Plus',
        minRead: 'min de lecture',
      },
      contact: {
        title: 'Contact',
        subtitle: 'Travaillons Ensemble',
        name: 'Votre Nom',
        email: 'Votre Email',
        subject: 'Sujet',
        message: 'Votre Message',
        send: 'Envoyer',
        success: 'Message envoyé!',
        location: 'Localisation',
        phone: 'Téléphone',
        emailLabel: 'Email',
      },
      footer: {
        rights: 'Tous droits réservés.',
        madeWith: 'Fait avec',
        and: 'et',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        about: 'عني',
        projects: 'المشاريع',
        skills: 'المهارات',
        blog: 'المدونة',
        contact: 'التواصل',
      },
      hero: {
        greeting: 'مرحباً، أنا',
        name: 'زكريا بعزيز',
        roles: ['مطور Full Stack', 'متخصص React', 'خبير Laravel', 'حلّال المشاكل'],
        cta: 'عرض أعمالي',
        ctaSecondary: 'تحميل السيرة الذاتية',
        location: 'طنجة، المغرب',
        available: 'متاح للعمل',
      },
      about: {
        title: 'عني',
        subtitle: 'المطور خلف الكود',
        bio: 'مطور Full Stack مقيم في طنجة، متخصص في React وLaravel. شغوف ببناء أدوات تحل مشاكل حقيقية، خاصة في التداول وتحليل البيانات.',
        languages: 'اللغات',
        downloadCV: 'تحميل السيرة الذاتية',
      },
      projects: {
        title: 'المشاريع',
        subtitle: 'ما قمت ببنائه',
        viewCode: 'عرض الكود',
        liveDemo: 'عرض مباشر',
        technologies: 'التقنيات',
      },
      skills: {
        title: 'المهارات',
        subtitle: 'ترسانتي التقنية',
      },
      blog: {
        title: 'المدونة',
        subtitle: 'أفكار ورؤى',
        readMore: 'اقرأ المزيد',
        minRead: 'دقيقة قراءة',
      },
      contact: {
        title: 'التواصل',
        subtitle: 'لنعمل معاً',
        name: 'اسمك',
        email: 'بريدك الإلكتروني',
        subject: 'الموضوع',
        message: 'رسالتك',
        send: 'إرسال',
        success: 'تم الإرسال بنجاح!',
        location: 'الموقع',
        phone: 'الهاتف',
        emailLabel: 'البريد الإلكتروني',
      },
      footer: {
        rights: 'جميع الحقوق محفوظة.',
        madeWith: 'صُنع بـ',
        and: 'و',
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
