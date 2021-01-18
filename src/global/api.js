export default {
    user: {
        signIn: '/user/signIn',
        signUp: '/user/signUp',
        logout: '/user/logout',
        editBaseInfo: '/user/edit/baseInfo',
        editPassword: '/user/edit/password',
        emailCode: '/user/emailCode',
    },
    library: {
        fictions: '/library/list/fiction',
        chapters: '/library/list/chapter',
        comments: '/library/list/comment',
        categories: '/library/list/category',
        latestFictions: '/library/list/fiction/latest',
        fictionDetail: '/library/detail/fiction',
        chapterDetail: '/library/detail/chapter',
        chapterNumber: '/library/detail/chapter/number',
        fictionBrief: '/library/brief/fiction',
        chapterBrief: '/library/brief/chapter',
        newFiction: '/library/new/fiction',
        newChapter: '/library/new/chapter',
        newComment: '/library/new/comment',
        editChapter: '/library/edit/chapter',
        hideChapter: '/library/hide/chapter',
        deleteChapter: '/library/delete/chapter',
    },
    forum: {
        notices: '/forum/list/notice',
        topics: '/forum/list/topic',
        latestTopics: '/forum/list/topic/latest',
        topicDetail: '/forum/detail/topic',
        newTopic: '/forum/new/topic',
        newReply: '/forum/new/reply',
    },
    access: {
        pageView: '/access/counter/pageView',
    }
};
