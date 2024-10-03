const pagination = (list, page, limit, totalcount) => {
    const total = totalcount;
    const currentPage = page ? Number(page) : 1;
    const totalPages = Math.ceil(total / limit);
    const pageMeta = {
        size: limit,
        page: currentPage,
        total: total,
        totalPages: totalPages,
        data: list,
    };
    return pageMeta;
};

module.exports = { pagination };
