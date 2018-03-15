module.exports = {
    url: '/rsms_2.0/user/menus',
    data: {
        resultCode: '0000',
        message: 'token已过期!',
        menus: [
            {
                name: '首页',
                icon: 'dashboard',
                url: '/dashboard',
                id:1
            },
            {
                name: '人员管理',
                icon: 'personnel',
                id:2,
                drop: [
                    {
                        name: '角色管理',
                        icon: 'character',
                        url: '/character',
                        id:21
                    }
                ]
            }
        ]
    }
};