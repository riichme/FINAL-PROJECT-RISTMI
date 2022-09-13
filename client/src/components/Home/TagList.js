// Export all list of tags and tags depending on category name

export const tagList = ['Burger', 'Pizza', 'Cold', 'Hot', 'Fruits', 'Cake', 'Bread', 'Potato']

const categoryTags = {
    "Utama": ['Burger', 'Pizza'],
    "Minuman": ['Cold', 'Hot', 'Fruits'],
    "Snack": ['Bread', 'Potato'],
    "Pastry": ['Cake', 'Bread']
}

export { categoryTags };