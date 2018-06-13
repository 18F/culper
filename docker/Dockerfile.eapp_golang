FROM scratch

# # Run in a non-privilege user scope
# # NOTE: This is for scratch images only!
# COPY ./conf/passwd /etc/passwd
# COPY ./conf/group /etc/group
# USER runner

# Copy over pre-staged directory
# # NOTE: This is for scratch images only!
# COPY --chown=runner:runner ./api/dist/ /
COPY ./api/dist/ /

# Set an entry point
ENTRYPOINT ["/eapp-backend"]
