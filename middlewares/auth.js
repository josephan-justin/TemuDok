function isLoggedIn(req, res, next){
    if(!req.session.userId){
        return res.redirect('/users/login')
    }
    next()
}

function isUser(req, res, next){
    if(req.session.role !== 'user'){
        return res.redirect('/')
    }
    next()
}

function isDoctor(req, res, next){
    if(res.session.role !== 'doctor'){
        return res.redirect('/')
    }
    next()
}

function isAdmin(req, res, next){
    if(res.session.role !== 'admin'){
        return res.redirect('/')
    }
    next()
}

module.exports = {isLoggedIn, isUser, isDoctor, isAdmin}

