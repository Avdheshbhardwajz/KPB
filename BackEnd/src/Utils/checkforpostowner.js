import mongoose from "mongoose";

function verifypostowner(blog_onwer_id, current_user_id) {

    const ObjectId = mongoose.Types.ObjectId;
    const userId = new ObjectId(current_user_id);
    const blogOwnerId = new ObjectId(blog_onwer_id);

    if (!userId.equals(blogOwnerId)) {
        return false
    }
    return true

}

export default verifypostowner;