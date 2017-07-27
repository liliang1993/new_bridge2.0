/**
 * Created by sailengsi on 2017/5/11.
 */
export default {
	name: 'login',
	data() {
		return {
			winSize: {
				width: '',
				height: ''
			},

			formOffset: {
				position: 'absolute',
				left: '',
				top: ''
			},
			login_actions: {
				disabled: false
			},
			data: {
				username: '',
				password: '',
				// token: ''
			},

			rule_data: {
				username: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请输入用户名'));
							} else {
								if (/^[a-zA-Z0-9_-]{1,16}$/.test(value)) {
									callback();
								} else {
									callback(new Error('用户名至少6位,由大小写字母和数字,-,_组成'));
								}
							}
						},
						trigger: 'blur'
					}]
					// password: [{
					// 	validator: (rule, value, callback) => {
					// 		if (value === '') {
					// 			callback(new Error('请输入密码'));
					// 		} else {
					// 			if (!(/^[a-zA-Z0-9_-]{6,16}$/.test(value))) {
					// 				callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'));
					// 			} else {
					// 				if (this.register === true) {
					// 					if (this.data.repassword !== '') {
					// 						this.$refs.data.validateField('repassword');
					// 					}
					// 				}
					// 				callback();
					// 			}

				// 		}
				// 	},
				// 	trigger: 'blur'
				// }]
			}
		}
	},
	methods: {
		setSize() {
			this.winSize.width = this.$$lib_$(window).width() + "px";
			this.winSize.height = this.$$lib_$(window).height() + "px";

			this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px';
			this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px';
		},

		onLogin(ref, type) {
			this.$refs[ref].validate((valid) => {
				if (valid) {
					this.login_actions.disabled = true;
					this.$$api_user_login({
						data: this[ref],
						fn: data => {
							if (data.result == true) {
								console.log('1234', data);
								this.$store.dispatch('update_userinfo', {
									userinfo: data.data
								}).then(() => {
									this.get_global_lps();
									this.get_global_std_symbols();
									this.login_actions.disabled = false;
									if (data.data.role === 'Admin') {
										this.$router.push({
											path: '/home/user'
										});
									} else if (data.data.role === 'RulesEditor') {
										this.$router.push({
											path: '/home/lp'
										});
									}
								});
							} else {
								this.login_actions.disabled = false;
								this.$message.error(data.message);
							}
						},
						errFn: (err) => {
							this.$message.error(err.msg);
							this.login_actions.disabled = false;
						}
					});
				}
			});
		},

		resetForm(ref) {
			this.$refs[ref].resetFields();
		}
	},
	created() {
		this.setSize();
		this.$$lib_$(window).resize(() => {
			this.setSize();
		});
	},
	mounted() {}
}